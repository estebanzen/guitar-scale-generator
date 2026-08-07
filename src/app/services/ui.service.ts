import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private guitarLabelSubject = new BehaviorSubject<string>('');
  guitarLabel$ = this.guitarLabelSubject.asObservable();
  private selectedModeSubject = new BehaviorSubject<'scales' | 'chords'>(
    'scales',
  );
  selectedMode$ = this.selectedModeSubject.asObservable();
  private rootNoteSubject = new BehaviorSubject<number | null>(null);
  rootNote$ = this.rootNoteSubject.asObservable();
  private selectedChordTypeSubject = new BehaviorSubject<string | null>(null);
  selectedChordType$ = this.selectedChordTypeSubject.asObservable();
  private selectedScaleTypeSubject = new BehaviorSubject<string | null>(null);
  selectedScaleType$ = this.selectedScaleTypeSubject.asObservable();
  private showGuitarSubject = new BehaviorSubject<boolean>(true);
  showGuitar$ = this.showGuitarSubject.asObservable();
  private showPianoSubject = new BehaviorSubject<boolean>(true);
  showPiano$ = this.showPianoSubject.asObservable();

  constructor() {
    try {
      const state = JSON.parse(
        localStorage.getItem('guitar-tools-state') || '{}',
      );
      if (state.selectedMode === 'scales' || state.selectedMode === 'chords') {
        this.selectedModeSubject.next(state.selectedMode);
      }
      if (Number.isInteger(state.noteRootValue)) {
        this.rootNoteSubject.next(state.noteRootValue);
      }
      if (typeof state.selectedChordType === 'string') {
        this.selectedChordTypeSubject.next(state.selectedChordType);
      }
      if (typeof state.selectedScaleType === 'string') {
        this.selectedScaleTypeSubject.next(state.selectedScaleType);
      }
      if (typeof state.showGuitar === 'boolean') {
        this.showGuitarSubject.next(state.showGuitar);
      }
      if (typeof state.showPiano === 'boolean') {
        this.showPianoSubject.next(state.showPiano);
      }
    } catch {
      // Ignore malformed saved state and use defaults.
    }
  }

  setGuitarLabel(label: string) {
    this.guitarLabelSubject.next(label);
  }

  setSelectedMode(mode: 'scales' | 'chords') {
    this.selectedModeSubject.next(mode);
  }

  setRootNote(noteIndex: number | null) {
    this.rootNoteSubject.next(noteIndex);
  }

  setSelectedChordType(shortName: string | null) {
    this.selectedChordTypeSubject.next(shortName);
  }

  setSelectedScaleType(id: string | null) {
    this.selectedScaleTypeSubject.next(id);
  }

  setShowGuitar(isVisible: boolean) {
    this.showGuitarSubject.next(isVisible);
  }

  setShowPiano(isVisible: boolean) {
    this.showPianoSubject.next(isVisible);
  }
}
