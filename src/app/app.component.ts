import { Component, OnInit } from '@angular/core';
import { UiService } from './services/ui.service';
import { CHORD_TYPES } from './common/chord-types';
import { SCALE_TYPES } from './common/scale-types';

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

  constructor(public uiService: UiService) {}

  ngOnInit() {
    this.isDarkTheme = this.uiService.getState().theme === 'dark';
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
