import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { CHORD_TYPES } from 'src/app/common/chord-types';
import { SCALE_TYPES } from 'src/app/common/scale-types';
import { MusicTheoryService } from 'src/app/services/music-theory.service';

@Component({
  selector: 'app-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.scss'],
})
export class ScalesComponent implements OnInit {
  //#region vars

  showGuitar: boolean = true;
  showPiano: boolean = true;

  // menu
  panelOpenState = false;

  notes = [
    {
      noteStr: 'C',
      active: false,
      root: false,
    },
    {
      noteStr: 'C#',
      active: false,
      root: false,
    },
    {
      noteStr: 'D',
      active: false,
      root: false,
    },
    {
      noteStr: 'D#',
      active: false,
      root: false,
    },
    {
      noteStr: 'E',
      active: false,
      root: false,
    },
    {
      noteStr: 'F',
      active: false,
      root: false,
    },
    {
      noteStr: 'F#',
      active: false,
      root: false,
    },
    {
      noteStr: 'G',
      active: false,
      root: false,
    },
    {
      noteStr: 'G#',
      active: false,
      root: false,
    },
    {
      noteStr: 'A',
      active: false,
      root: false,
    },
    {
      noteStr: 'A#',
      active: false,
      root: false,
    },
    {
      noteStr: 'B',
      active: false,
      root: false,
    },
  ];

  cuerdas = ['E', 'B', 'G', 'D', 'A', 'E'];

  noteRootValue: any;
  showGuitarOptions: any;

  cantidadTrastes: number = 24;
  cantidadTrastesArr: any = [];
  showPianoOptions: any;
  sliderColor = 'primary';
  panelState: Record<string, boolean> = {
    fretsAmount: false,
    strings: false,
    pianoOctaves: false,
  };
  // cantidadCuerdas: number = 6;
  puntitos: any = {
    3: 1,
    5: 1,
    7: 1,
    9: 1,
    12: 2,
    15: 1,
    17: 1,
    19: 1,
    21: 1,
    24: 2,
  };

  diapason: any = [];

  pianoCantidadTeclas: number = 24;
  pianoTeclas: any = [];

  selectedMode: 'scales' | 'chords' = 'scales';

  legacyChordTypes = [
    {
      name: 'Major',
      shortName: 'maj',
      intervals: [0, 4, 7],
      formula: '1 - 3 - 5',
    },
    {
      name: 'Minor',
      shortName: 'min',
      intervals: [0, 3, 7],
      formula: '1 - ♭3 - 5',
    },
    {
      name: 'Dominant 7th',
      shortName: '7',
      intervals: [0, 4, 7, 10],
      formula: '1 - 3 - 5 - ♭7',
    },
    {
      name: 'Major 7th',
      shortName: 'maj7',
      intervals: [0, 4, 7, 11],
      formula: '1 - 3 - 5 - 7',
    },
    {
      name: 'Minor 7th',
      shortName: 'min7',
      intervals: [0, 3, 7, 10],
      formula: '1 - ♭3 - 5 - ♭7',
    },
    {
      name: 'Diminished',
      shortName: 'dim',
      intervals: [0, 3, 6],
      formula: '1 - ♭3 - ♭5',
    },
    {
      name: 'Half-Diminished 7th',
      shortName: 'min7♭5',
      intervals: [0, 3, 6, 10],
      formula: '1 - ♭3 - ♭5 - ♭7',
    },
    {
      name: 'Augmented',
      shortName: 'aug',
      intervals: [0, 4, 8],
      formula: '1 - 3 - ♯5',
    },
    {
      name: 'Suspended 4th',
      shortName: 'sus4',
      intervals: [0, 5, 7],
      formula: '1 - 4 - 5',
    },
    {
      name: 'Suspended 2nd',
      shortName: 'sus2',
      intervals: [0, 2, 7],
      formula: '1 - 2 - 5',
    },
  ];

  chordTypes = CHORD_TYPES;
  selectedChordType: any = null;
  selectedScaleType: string | null = null;

  scaleTypes = SCALE_TYPES;

  //#endregion vars

  //#region methods
  constructor(
    private uiService: UiService,
    private musicTheory: MusicTheoryService,
  ) {
    var t = this;

    t.diapasonConstructor();
    t.pianoConstructor();
  }

  ngOnInit() {
    this.restoreState();
    this.uiService.setSelectedMode(this.selectedMode);
    queueMicrotask(() =>
      this.uiService.setRootNote(this.noteRootValue ?? null),
    );
    this.uiService.setSelectedChordType(
      this.selectedChordType?.shortName ?? null,
    );
    this.uiService.setSelectedScaleType(this.selectedScaleType);
    this.uiService.setShowGuitar(this.showGuitar);
    this.uiService.setShowPiano(this.showPiano);

    this.uiService.selectedMode$.subscribe((mode) => {
      this.selectedMode = mode;
      this.onModeChange();
    });

    this.uiService.rootNote$.subscribe((noteIndex) => {
      if (noteIndex !== null) {
        this.setRootNote(noteIndex);
      }
    });

    this.uiService.selectedChordType$.subscribe((shortName) => {
      const chord = this.chordTypes.find(
        (item) => item.shortName === shortName,
      );
      if (chord && chord !== this.selectedChordType) {
        this.selectChordType(chord);
      }
    });

    this.uiService.selectedScaleType$.subscribe((scaleId) => {
      if (scaleId && scaleId !== this.selectedScaleType) {
        this.selectScaleType(scaleId);
      }
    });

    this.uiService.showGuitar$.subscribe((isVisible) => {
      this.showGuitar = isVisible;
      this.saveState();
    });

    this.uiService.showPiano$.subscribe((isVisible) => {
      this.showPiano = isVisible;
      this.saveState();
    });
  }

  renderPuntitosGuitarClassCss(nroTraste: number) {
    var t = this;
    return t.puntitos[nroTraste];
  }

  /** Aplica el patrón del modo elegido y refresca la etiqueta de la barra. */
  onModeChange() {
    if (this.selectedMode === 'chords') {
      if (!this.selectedChordType) {
        this.selectedChordType = this.chordTypes[0];
      }
      this.applyChord();
      this.uiService.setSelectedChordType(this.selectedChordType.shortName);
    } else if (this.selectedScaleType) {
      this.applyScale();
    }
    this.updateGuitarLabel();
    this.saveState();
  }

  /** Elige un patrón de acorde, aplica sus notas y guarda la selección. */
  selectChordType(chord: any) {
    this.selectedChordType = chord;
    this.applyChord();
    this.updateGuitarLabel();
    this.uiService.setSelectedChordType(chord.shortName);
    this.saveState();
  }

  /** Lleva los intervalos del acorde elegido a la raíz actual. */
  applyChord() {
    if (this.noteRootValue === undefined || this.noteRootValue === null) {
      this.noteRootValue = 0;
      this.uiService.setRootNote(this.noteRootValue);
    }
    if (!this.selectedChordType) {
      this.selectedChordType = this.chordTypes[0];
    }

    this.musicTheory.applyIntervals(
      this.notes,
      this.noteRootValue,
      this.selectedChordType.intervals,
    );

    this.diapasonConstructor();
    this.pianoConstructor();
  }

  /** Lleva los intervalos de la escala elegida a la raíz actual. */
  applyScale() {
    const scale = this.scaleTypes.find(
      (item) => item.id === this.selectedScaleType,
    );
    if (!scale) {
      return;
    }
    if (this.noteRootValue === undefined || this.noteRootValue === null) {
      this.noteRootValue = 0;
      this.uiService.setRootNote(this.noteRootValue);
    }

    this.musicTheory.applyIntervals(
      this.notes,
      this.noteRootValue,
      scale.intervals,
    );
    this.diapasonConstructor();
    this.pianoConstructor();
  }

  /** Devuelve las notas activas del acorde en un texto fácil de leer. */
  getChordNotesString(): string {
    return this.notes
      .filter((n) => n.active)
      .map((n) => n.noteStr)
      .join(' - ');
  }

  /** Arma la etiqueta corta del acorde para la barra. */
  getChordLabel(): string {
    if (
      this.selectedMode !== 'chords' ||
      !this.selectedChordType ||
      this.noteRootValue === undefined ||
      this.noteRootValue === null
    ) {
      return '';
    }

    return `${this.notes[this.noteRootValue].noteStr}${this.selectedChordType.shortName}`;
  }

  /** Publica la etiqueta actual de acorde o escala después del render. */
  updateGuitarLabel() {
    const label = this.getChordLabel() || this.getScaleLabel();
    setTimeout(() => this.uiService.setGuitarLabel(label));
  }

  /** Arma la etiqueta corta de la escala para la barra. */
  getScaleLabel(): string {
    if (
      this.selectedMode !== 'scales' ||
      !this.selectedScaleType ||
      this.noteRootValue === undefined ||
      this.noteRootValue === null
    ) {
      return '';
    }

    const scale = this.scaleTypes.find(
      (item) => item.id === this.selectedScaleType,
    );
    return scale
      ? `${this.notes[this.noteRootValue].noteStr}${scale.shortName}`
      : '';
  }

  /** Guarda la configuración del componente en el estado central de la UI. */
  private saveState() {
    const state = {
      noteRootValue: this.noteRootValue,
      selectedMode: this.selectedMode,
      cantidadTrastes: this.cantidadTrastes,
      pianoCantidadTeclas: this.pianoCantidadTeclas,
      showGuitar: this.showGuitar,
      showPiano: this.showPiano,
      panelState: this.panelState,
      ...(this.selectedMode === 'chords'
        ? { selectedChordType: this.selectedChordType?.shortName }
        : {
            selectedScaleType: this.selectedScaleType,
            activeNoteIndices: this.notes
              .map((note, index) => (note.active ? index : -1))
              .filter((index) => index >= 0),
          }),
    };

    this.uiService.updateState(state);
  }

  /** Restaura y valida la configuración guardada desde el estado central. */
  private restoreState() {
    const state = this.uiService.getState();
    if (
      typeof state.noteRootValue === 'number' &&
      Number.isInteger(state.noteRootValue) &&
      state.noteRootValue >= 0 &&
      state.noteRootValue < this.notes.length
    ) {
      this.noteRootValue = state.noteRootValue;
    }

    if (state.selectedMode === 'scales' || state.selectedMode === 'chords') {
      this.selectedMode = state.selectedMode;
    }

    if (
      Number.isInteger(state.cantidadTrastes) &&
      state.cantidadTrastes >= 5 &&
      state.cantidadTrastes <= 25
    ) {
      this.cantidadTrastes = state.cantidadTrastes;
    }

    if (
      Number.isInteger(state.pianoCantidadTeclas) &&
      state.pianoCantidadTeclas >= 12 &&
      state.pianoCantidadTeclas <= 60 &&
      state.pianoCantidadTeclas % 12 === 0
    ) {
      this.pianoCantidadTeclas = state.pianoCantidadTeclas;
    }

    if (typeof state.showGuitar === 'boolean') {
      this.showGuitar = state.showGuitar;
    }

    if (typeof state.showPiano === 'boolean') {
      this.showPiano = state.showPiano;
    }

    if (
      this.selectedMode === 'chords' &&
      typeof state.selectedChordType === 'string'
    ) {
      this.selectedChordType =
        this.chordTypes.find(
          (chord) => chord.shortName === state.selectedChordType,
        ) || null;
    }

    if (
      this.selectedMode === 'scales' &&
      typeof state.selectedScaleType === 'string' &&
      this.scaleTypes.some((scale) => scale.id === state.selectedScaleType)
    ) {
      this.selectedScaleType = state.selectedScaleType;
    }

    if (
      this.selectedMode === 'scales' &&
      Array.isArray(state.activeNoteIndices)
    ) {
      const activeNoteIndices = new Set(
        state.activeNoteIndices.filter(
          (index: unknown) =>
            Number.isInteger(index) &&
            (index as number) >= 0 &&
            (index as number) < this.notes.length,
        ),
      );
      this.notes.forEach((note, index) => {
        note.active = activeNoteIndices.has(index);
        note.root = index === this.noteRootValue;
      });
    }

    if (state.panelState && typeof state.panelState === 'object') {
      Object.keys(this.panelState).forEach((panel) => {
        if (typeof state.panelState[panel] === 'boolean') {
          this.panelState[panel] = state.panelState[panel];
        }
      });
    }
    this.diapasonConstructor();
    this.pianoConstructor();
  }

  /** Registra si un panel desplegable quedó abierto o cerrado. */
  setPanelState(panel: string, isOpen: boolean) {
    this.panelState[panel] = isOpen;
    this.saveState();
  }

  /** Elige un patrón de escala, aplica sus notas y guarda la selección. */
  selectScaleType(scaleId: string) {
    if (!this.scaleTypes.some((scale) => scale.id === scaleId)) {
      return;
    }

    this.selectedScaleType = scaleId;
    this.applyScale();
    this.uiService.setSelectedScaleType(scaleId);
    this.updateGuitarLabel();
    this.saveState();
  }

  /** Indica si una nota activa funciona como séptima menor o mayor. */
  isSeventh(note: any): boolean {
    if (
      !note.active ||
      this.noteRootValue === undefined ||
      this.noteRootValue === null
    ) {
      return false;
    }

    return this.musicTheory.hasInterval(
      this.notes,
      note,
      this.noteRootValue,
      [10, 11],
    );
  }

  /** Indica si una nota activa funciona como tercera menor o mayor. */
  isThird(note: any): boolean {
    if (
      !note.active ||
      this.noteRootValue === undefined ||
      this.noteRootValue === null
    ) {
      return false;
    }

    return this.musicTheory.hasInterval(
      this.notes,
      note,
      this.noteRootValue,
      [3, 4],
    );
  }

  /** Cambia la raíz y reaplica el acorde o escala activos cuando corresponde. */
  setRootNote(index: number) {
    if (index < 0 || index >= this.notes.length) {
      return;
    }

    this.notes.forEach((note, noteIndex) => {
      note.root = noteIndex === index;
      if (noteIndex === index) {
        note.active = true;
      }
    });

    this.noteRootValue = index;

    if (this.selectedMode === 'chords') {
      if (this.selectedChordType) {
        this.applyChord();
      }
      this.updateGuitarLabel();
    } else if (this.selectedScaleType) {
      this.applyScale();
      this.updateGuitarLabel();
    }
    this.saveState();
  }

  /** Reconstruye las notas de cada cuerda según afinación y cantidad de trastes. */
  diapasonConstructor() {
    var t = this;

    t.diapason = [];

    for (let index = 0; index < t.cuerdas.length; index++) {
      // t.cantidadTrastesArr.push(index);
      // console.log('index: ', index)
      // console.log('t.cuerdas[index]: ', t.cuerdas[index])

      let noteIndex = t.notes.findIndex(
        (eee) => eee.noteStr === t.cuerdas[index],
      );

      // console.log('noteIndex: ', noteIndex);

      var r = noteIndex;
      let stringtopush = [];

      // se crea la cuerda
      for (let n = 0; n <= t.cantidadTrastes; n++) {
        // stringtopush
        // t.diapason.push(t.notes[r]);
        stringtopush.push(t.notes[r]);

        // if

        if (r == 11) {
          r = 0;
        } else {
          r++;
        }

        // if{ noteIndex<= t.notes.length}
        // noteIndex++
      }

      t.diapason.push(stringtopush);
    }
    t.cantidadTrastesConstructor();
  }

  /** Activa o desactiva una nota de cualquier instrumento e intenta reconocer el patrón. */
  onClickNote(note: any) {
    var t = this;

    for (let index = 0; index < t.notes.length; index++) {
      if (note.noteStr === t.notes[index].noteStr) {
        t.notes[index].active = !t.notes[index].active;
      }
    }
    t.detectSelectionFromActiveNotes();
    t.diapasonConstructor();
    t.pianoConstructor();
    t.saveState();
  }

  /** Detecta el acorde o escala que coincide; si no quedan notas, limpia los selectores. */
  private detectSelectionFromActiveNotes() {
    const activeIndices = this.musicTheory.activeIndices(this.notes);

    if (activeIndices.length === 0) {
      this.noteRootValue = null;
      this.notes.forEach((note) => (note.root = false));
      this.selectedChordType = null;
      this.selectedScaleType = null;
      this.uiService.setRootNote(null);
      this.uiService.setSelectedChordType(null);
      this.uiService.setSelectedScaleType(null);
      this.updateGuitarLabel();
      return;
    }

    const singleActiveNote =
      activeIndices.length === 1 ? activeIndices[0] : null;
    if (singleActiveNote !== null) {
      this.noteRootValue = singleActiveNote;
      this.notes.forEach((note, index) => {
        note.root = index === singleActiveNote;
      });
    }

    if (this.noteRootValue === undefined || this.noteRootValue === null) {
      return;
    }

    const intervals = this.musicTheory.intervalsFromRoot(
      activeIndices,
      this.noteRootValue,
    );

    if (this.selectedMode === 'chords') {
      const chord = this.musicTheory.findPattern(this.chordTypes, intervals);
      this.selectedChordType = chord || null;
      this.uiService.setSelectedChordType(chord?.shortName ?? null);
      this.updateGuitarLabel();
      if (singleActiveNote !== null) {
        this.uiService.setRootNote(singleActiveNote);
      }
      return;
    }

    const scale = this.musicTheory.findPattern(this.scaleTypes, intervals);
    this.selectedScaleType = scale?.id ?? null;
    this.uiService.setSelectedScaleType(this.selectedScaleType);
    this.updateGuitarLabel();
    if (singleActiveNote !== null) {
      this.uiService.setRootNote(singleActiveNote);
    }
  }

  /** Reconstruye la secuencia del piano con la cantidad de octavas configurada. */
  pianoConstructor() {
    var t = this;
    t.pianoTeclas = [];

    var r = 0;

    for (let i = 0; i < t.pianoCantidadTeclas; i++) {
      var formatClassesCss: any = t.notes[r];
      formatClassesCss['classes'] = t.notes[r].noteStr
        .toLowerCase()
        .replace('#', '-s');

      t.pianoTeclas.push(formatClassesCss);
      // console.log('formatClassesCss ', formatClassesCss);

      if (r == 11) {
        r = 0;
      } else {
        r++;
      }
    }
  }

  /** Aplica y guarda un cambio en la cantidad de octavas del piano. */
  onPianoOctavesChange() {
    this.pianoConstructor();
    this.saveState();
  }

  /** Aplica y guarda un cambio en la cantidad de trastes de la guitarra. */
  onFretsAmountChange() {
    this.diapasonConstructor();
    this.saveState();
  }

  /** Genera las etiquetas desde la cuerda al aire (0) hasta el último traste. */
  cantidadTrastesConstructor() {
    var t = this;

    t.cantidadTrastesArr = [];

    for (let index = 0; index <= t.cantidadTrastes; index++) {
      t.cantidadTrastesArr.push(index);
    }
  }

  /** Agrega una cuerda usando como base la afinación de la última existente. */
  onClickAddString() {
    const lastNote =
      this.cuerdas.length > 0 ? this.cuerdas[this.cuerdas.length - 1] : 'E';
    this.cuerdas.push(lastNote);
    this.diapasonConstructor();
  }

  /** Saca la última cuerda configurada de la guitarra. */
  onClickDeleteString() {
    this.cuerdas.pop();
    this.diapasonConstructor();
  }

  //#endregion
}
