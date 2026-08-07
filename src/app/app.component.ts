import { Component, OnInit } from '@angular/core';
import { PlaybackInstrument, UiService } from './services/ui.service';
import { CHORD_TYPES } from './common/chord-types';
import { SCALE_TYPES } from './common/scale-types';
import { AudioPlaybackService } from './services/audio-playback.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'guitar-tools';
  over: any;

  isDarkTheme = false;
  notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  /* Legacy chord list retained only for migration. */
  legacyChordTypes = [
    { name: 'Major', shortName: 'maj' },
    { name: 'Minor', shortName: 'min' },
    { name: 'Dominant 7th', shortName: '7' },
    { name: 'Major 7th', shortName: 'maj7' },
    { name: 'Minor 7th', shortName: 'min7' },
    { name: 'Diminished', shortName: 'dim' },
    { name: 'Half-Diminished 7th', shortName: 'min7♭5' },
    { name: 'Augmented', shortName: 'aug' },
    { name: 'Suspended 4th', shortName: 'sus4' },
    { name: 'Suspended 2nd', shortName: 'sus2' },
  ];
  chordTypes = CHORD_TYPES;
  scaleTypes = SCALE_TYPES;
  visibleInstruments = ['guitar', 'piano'];
  playbackBpm = 100;
  playbackLoop = false;
  playbackInstrument: PlaybackInstrument = 'guitar';
  isPlaying = false;
  selectedNotesLabel = '';
  private restartTimer?: number;

  constructor(
    public uiService: UiService,
    private audioPlayback: AudioPlaybackService,
  ) {}

  ngOnInit() {
    this.isDarkTheme = this.uiService.getState().theme === 'dark';
    const state = this.uiService.getState();
    this.playbackBpm = state.playbackBpm;
    this.playbackLoop = state.playbackLoop;
    this.playbackInstrument = state.playbackInstrument;
    this.audioPlayback.isPlaying$.subscribe((isPlaying) => {
      this.isPlaying = isPlaying;
    });
    this.uiService.state$.subscribe((updatedState) => {
      this.selectedNotesLabel = this.getSelectedNotesLabel(
        updatedState.activeNoteIndices,
        updatedState.noteRootValue,
      );
      if (this.isPlaying) {
        this.restartPlayback(updatedState.activeNoteIndices, updatedState.noteRootValue);
      }
    });
    this.applyTheme();
    this.uiService.showGuitar$.subscribe((isVisible) => {
      this.setInstrumentVisibility('guitar', isVisible);
    });
    this.uiService.showPiano$.subscribe((isVisible) => {
      this.setInstrumentVisibility('piano', isVisible);
    });
  }

  /** Sincroniza los botones de instrumentos con selección múltiple y el estado de la UI. */
  onInstrumentsChange(instruments: string[]) {
    this.uiService.setShowGuitar(instruments.includes('guitar'));
    this.uiService.setShowPiano(instruments.includes('piano'));
  }

  /** Reproduce en arpegio la selección de notas activa. */
  playCurrentSelection() {
    const state = this.uiService.getState();
    this.audioPlayback.playNotes(
      state.activeNoteIndices,
      state.noteRootValue,
      this.playbackBpm,
      this.playbackLoop,
      this.playbackInstrument,
    );
  }

  /** Guarda el BPM dentro de un rango práctico para estudiar. */
  onBpmChange() {
    this.playbackBpm = Math.min(240, Math.max(40, Number(this.playbackBpm) || 100));
    this.uiService.updateState({ playbackBpm: this.playbackBpm });
  }

  /** Activa o desactiva la repetición continua del arpegio. */
  togglePlaybackLoop() {
    this.playbackLoop = !this.playbackLoop;
    this.uiService.updateState({ playbackLoop: this.playbackLoop });
  }

  /** Cambia y guarda el timbre real que usa el reproductor. */
  onPlaybackInstrumentChange(instrument: PlaybackInstrument) {
    this.playbackInstrument = instrument;
    this.uiService.updateState({ playbackInstrument: instrument });
  }

  /** Corta la repetición que esté programada. */
  stopPlayback() {
    if (this.restartTimer !== undefined) {
      window.clearTimeout(this.restartTimer);
      this.restartTimer = undefined;
    }
    this.audioPlayback.stop();
  }

  /** Reinicia el arpegio al terminar de aplicar una nueva selecciÃ³n de notas. */
  private restartPlayback(activeNoteIndices: number[], rootNoteValue: number | null) {
    if (this.restartTimer !== undefined) {
      window.clearTimeout(this.restartTimer);
    }
    this.restartTimer = window.setTimeout(() => {
      this.restartTimer = undefined;
      this.audioPlayback.playNotes(
        activeNoteIndices,
        rootNoteValue,
        this.playbackBpm,
        this.playbackLoop,
        this.playbackInstrument,
      );
    });
  }

  /** Arma la lista visible de notas, arrancando por la raíz cuando está definida. */
  private getSelectedNotesLabel(activeNoteIndices: number[], rootNoteValue: number | null): string {
    const uniqueNotes = [...new Set(activeNoteIndices)].sort((a, b) => a - b);
    if (rootNoteValue === null || !uniqueNotes.includes(rootNoteValue)) {
      return uniqueNotes.map((noteIndex) => this.notes[noteIndex]).join(' ');
    }

    const notesFromRoot = uniqueNotes.sort(
      (firstNote, secondNote) =>
        (firstNote - rootNoteValue + 12) % 12 - (secondNote - rootNoteValue + 12) % 12,
    );
    return notesFromRoot.map((noteIndex) => this.notes[noteIndex]).join(' ');
  }

  /** Alterna entre los temas claro y oscuro guardados. */
  toggleDarkTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
    this.uiService.setTheme(this.isDarkTheme ? 'dark' : 'light');
  }

  /** Aplica la clase del tema actual al body del documento. */
  private applyTheme() {
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
  }

  /** Mantiene la lista de instrumentos elegidos en la barra sincronizada con el estado. */
  private setInstrumentVisibility(instrument: string, isVisible: boolean) {
    this.visibleInstruments = isVisible
      ? [...new Set([...this.visibleInstruments, instrument])]
      : this.visibleInstruments.filter((item) => item !== instrument);
  }
}
