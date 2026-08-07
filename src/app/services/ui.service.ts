import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type MusicMode = 'scales' | 'chords';
export type Theme = 'light' | 'dark';

export interface MusicState {
  theme: Theme;
  noteRootValue: number | null;
  selectedMode: MusicMode;
  selectedChordType: string | null;
  selectedScaleType: string | null;
  activeNoteIndices: number[];
  cantidadTrastes: number;
  pianoCantidadTeclas: number;
  showGuitar: boolean;
  showPiano: boolean;
  panelState: Record<string, boolean>;
}

const STORAGE_KEY = 'guitar-tools-state';

const DEFAULT_STATE: MusicState = {
  theme: 'light',
  noteRootValue: null,
  selectedMode: 'scales',
  selectedChordType: null,
  selectedScaleType: null,
  activeNoteIndices: [],
  cantidadTrastes: 24,
  pianoCantidadTeclas: 24,
  showGuitar: true,
  showPiano: true,
  panelState: {},
};

@Injectable({ providedIn: 'root' })
export class UiService {
  private readonly stateSubject: BehaviorSubject<MusicState>;
  readonly state$: Observable<MusicState>;

  private readonly guitarLabelSubject = new BehaviorSubject<string>('');
  readonly guitarLabel$ = this.guitarLabelSubject.asObservable();
  private readonly selectedModeSubject: BehaviorSubject<MusicMode>;
  readonly selectedMode$: Observable<MusicMode>;
  private readonly rootNoteSubject: BehaviorSubject<number | null>;
  readonly rootNote$: Observable<number | null>;
  private readonly selectedChordTypeSubject: BehaviorSubject<string | null>;
  readonly selectedChordType$: Observable<string | null>;
  private readonly selectedScaleTypeSubject: BehaviorSubject<string | null>;
  readonly selectedScaleType$: Observable<string | null>;
  private readonly showGuitarSubject: BehaviorSubject<boolean>;
  readonly showGuitar$: Observable<boolean>;
  private readonly showPianoSubject: BehaviorSubject<boolean>;
  readonly showPiano$: Observable<boolean>;

  constructor() {
    const state = this.readState();
    this.stateSubject = new BehaviorSubject<MusicState>(state);
    this.state$ = this.stateSubject.asObservable();
    this.selectedModeSubject = new BehaviorSubject<MusicMode>(
      state.selectedMode,
    );
    this.selectedMode$ = this.selectedModeSubject.asObservable();
    this.rootNoteSubject = new BehaviorSubject<number | null>(
      state.noteRootValue,
    );
    this.rootNote$ = this.rootNoteSubject.asObservable();
    this.selectedChordTypeSubject = new BehaviorSubject<string | null>(
      state.selectedChordType,
    );
    this.selectedChordType$ = this.selectedChordTypeSubject.asObservable();
    this.selectedScaleTypeSubject = new BehaviorSubject<string | null>(
      state.selectedScaleType,
    );
    this.selectedScaleType$ = this.selectedScaleTypeSubject.asObservable();
    this.showGuitarSubject = new BehaviorSubject<boolean>(state.showGuitar);
    this.showGuitar$ = this.showGuitarSubject.asObservable();
    this.showPianoSubject = new BehaviorSubject<boolean>(state.showPiano);
    this.showPiano$ = this.showPianoSubject.asObservable();
  }

  getState(): MusicState {
    const state = this.stateSubject.value;
    return {
      ...state,
      activeNoteIndices: [...state.activeNoteIndices],
      panelState: { ...state.panelState },
    };
  }

  updateState(update: Partial<MusicState>) {
    const current = this.stateSubject.value;
    const next: MusicState = {
      ...current,
      ...update,
      activeNoteIndices: update.activeNoteIndices
        ? [...update.activeNoteIndices]
        : current.activeNoteIndices,
      panelState: update.panelState
        ? { ...update.panelState }
        : current.panelState,
    };
    this.stateSubject.next(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  setTheme(theme: Theme) {
    this.updateState({ theme });
    localStorage.removeItem('theme');
  }

  setGuitarLabel(label: string) {
    this.guitarLabelSubject.next(label);
  }

  setSelectedMode(mode: MusicMode) {
    this.selectedModeSubject.next(mode);
    this.updateState({ selectedMode: mode });
  }

  setRootNote(noteIndex: number | null) {
    this.rootNoteSubject.next(noteIndex);
    this.updateState({ noteRootValue: noteIndex });
  }

  setSelectedChordType(shortName: string | null) {
    this.selectedChordTypeSubject.next(shortName);
    this.updateState({ selectedChordType: shortName });
  }

  setSelectedScaleType(id: string | null) {
    this.selectedScaleTypeSubject.next(id);
    this.updateState({ selectedScaleType: id });
  }

  setShowGuitar(isVisible: boolean) {
    this.showGuitarSubject.next(isVisible);
    this.updateState({ showGuitar: isVisible });
  }

  setShowPiano(isVisible: boolean) {
    this.showPianoSubject.next(isVisible);
    this.updateState({ showPiano: isVisible });
  }

  private readState(): MusicState {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return {
        ...DEFAULT_STATE,
        ...raw,
        theme:
          raw.theme === 'dark' || raw.theme === 'light'
            ? raw.theme
            : localStorage.getItem('theme') === 'dark'
              ? 'dark'
              : 'light',
        activeNoteIndices: Array.isArray(raw.activeNoteIndices)
          ? raw.activeNoteIndices
          : [],
        panelState:
          raw.panelState && typeof raw.panelState === 'object'
            ? raw.panelState
            : {},
      };
    } catch {
      return { ...DEFAULT_STATE };
    }
  }
}
