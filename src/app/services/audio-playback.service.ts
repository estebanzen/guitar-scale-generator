import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { instrument, Player } from 'soundfont-player';
import { PlaybackInstrument } from './ui.service';

/** Reproduce colecciones de notas con un sintetizador liviano del navegador. */
@Injectable({ providedIn: 'root' })
export class AudioPlaybackService {
  private audioContext?: AudioContext;
  private loopTimer?: number;
  private completionTimer?: number;
  private readonly activeOscillators = new Set<OscillatorNode>();
  private readonly samplePlayers = new Map<PlaybackInstrument, Promise<Player>>();
  private activeSamplePlayer?: Player;
  private playbackVersion = 0;
  readonly isPlaying$ = new BehaviorSubject(false);

  /** Arpegia las notas activas en orden ascendente desde la raíz elegida. */
  async playNotes(
    activeNoteIndices: number[],
    rootIndex: number | null,
    bpm: number,
    loop: boolean,
    playbackInstrument: PlaybackInstrument,
  ) {
    if (activeNoteIndices.length === 0) {
      this.isPlaying$.next(false);
      return;
    }

    const playbackVersion = ++this.playbackVersion;
    this.clearTimers();
    this.stopActiveTones();
    this.activeSamplePlayer?.stop();
    const context = this.getContext();
    try {
      await context.resume();
    } catch {
      this.isPlaying$.next(false);
      return;
    }

    let samplePlayer: Player;
    try {
      samplePlayer = await this.getSamplePlayer(playbackInstrument);
    } catch {
      if (playbackVersion === this.playbackVersion) {
        this.isPlaying$.next(false);
      }
      return;
    }

    if (playbackVersion !== this.playbackVersion) {
      return;
    }

    this.isPlaying$.next(true);
    this.activeSamplePlayer = samplePlayer;

    const orderedNotes = this.orderNotes(activeNoteIndices);
    const notesToPlay = rootIndex === null ? orderedNotes : [...orderedNotes, rootIndex];
    const startTime = context.currentTime + 0.05;
    const beatDuration = 60 / bpm;
    notesToPlay.forEach((noteIndex, index) => {
      const octave = index === notesToPlay.length - 1 && rootIndex !== null ? 1 : 0;
      samplePlayer.play(this.getNoteName(noteIndex, octave), startTime + index * beatDuration, {
        duration: beatDuration * 0.9,
        gain: 0.8,
      });
    });

    if (loop) {
      this.loopTimer = window.setTimeout(
        () => this.playNotes(activeNoteIndices, rootIndex, bpm, true, playbackInstrument),
        notesToPlay.length * beatDuration * 1000,
      );
    } else {
      this.completionTimer = window.setTimeout(
        () => this.isPlaying$.next(false),
        notesToPlay.length * beatDuration * 1000,
      );
    }
  }

  /** Frena de inmediato las notas activas y cualquier vuelta futura del loop. */
  stop() {
    this.playbackVersion++;
    this.clearTimers();
    this.stopActiveTones();
    this.activeSamplePlayer?.stop();
    this.activeSamplePlayer = undefined;
    this.isPlaying$.next(false);
  }

  /** Cancela los temporizadores internos sin tocar el indicador visual de reproducciÃ³n. */
  private clearTimers() {
    if (this.loopTimer !== undefined) {
      window.clearTimeout(this.loopTimer);
      this.loopTimer = undefined;
    }
    if (this.completionTimer !== undefined) {
      window.clearTimeout(this.completionTimer);
      this.completionTimer = undefined;
    }
  }

  /** Corta todos los osciladores programados, incluso los que todavía no arrancaron. */
  private stopActiveTones() {
    this.activeOscillators.forEach((oscillator) => {
      try {
        oscillator.stop();
      } catch {
        // El oscilador ya puede haber terminado naturalmente.
      }
    });
    this.activeOscillators.clear();
  }

  /** Crea el contexto de audio solo cuando el usuario pide escuchar algo. */
  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  /** Carga una sola vez los samples del instrumento elegido y los deja listos en memoria. */
  private getSamplePlayer(playbackInstrument: PlaybackInstrument): Promise<Player> {
    const cachedPlayer = this.samplePlayers.get(playbackInstrument);
    if (cachedPlayer) {
      return cachedPlayer;
    }

    const instrumentName = playbackInstrument === 'piano'
      ? 'acoustic_grand_piano'
      : 'acoustic_guitar_steel';
    const player = instrument(this.getContext(), instrumentName, { soundfont: 'FluidR3_GM' });
    this.samplePlayers.set(playbackInstrument, player);
    return player;
  }

  /** Ordena las notas de la más grave a la más aguda dentro de la octava. */
  private orderNotes(activeNoteIndices: number[]): number[] {
    return [...activeNoteIndices].sort((a, b) => a - b);
  }

  /** Convierte el Ã­ndice cromÃ¡tico interno al nombre que espera el reproductor de samples. */
  private getNoteName(noteIndex: number, octave: number): string {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    return `${noteNames[noteIndex]}${4 + octave}`;
  }

  /** Genera una nota corta con envolvente suave para evitar clicks de audio. */
  private playTone(noteIndex: number, startTime: number, duration: number, octave = 0) {
    const context = this.getContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const midiNote = 60 + noteIndex + octave * 12;

    oscillator.type = 'triangle';
    oscillator.frequency.value = 440 * Math.pow(2, (midiNote - 69) / 12);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.18, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(gain);
    gain.connect(context.destination);
    this.activeOscillators.add(oscillator);
    oscillator.onended = () => this.activeOscillators.delete(oscillator);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.03);
  }
}
