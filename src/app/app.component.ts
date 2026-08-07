import { Component, OnInit } from '@angular/core';
import { UiService } from './services/ui.service';

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
  chordTypes = [
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
  scaleTypes = [
    { id: 'major', name: 'Major' },
    { id: 'minor', name: 'Minor' },
    { id: 'majorPentatonic', name: 'Major Pentatonic' },
    { id: 'minorPentatonic', name: 'Minor Pentatonic' },
    { id: 'blues', name: 'Blues' },
    { id: 'ionian', name: 'Ionian (Major)' },
    { id: 'dorian', name: 'Dorian' },
    { id: 'phrygian', name: 'Phrygian' },
    { id: 'lydian', name: 'Lydian' },
    { id: 'mixolydian', name: 'Mixolydian' },
    { id: 'aeolian', name: 'Aeolian (Minor)' },
    { id: 'locrian', name: 'Locrian' },
  ];
  visibleInstruments = ['guitar', 'piano'];

  constructor(public uiService: UiService) {}

  ngOnInit() {
    this.isDarkTheme = localStorage.getItem('theme') === 'dark';
    this.applyTheme();
    this.uiService.showGuitar$.subscribe((isVisible) => {
      this.setInstrumentVisibility('guitar', isVisible);
    });
    this.uiService.showPiano$.subscribe((isVisible) => {
      this.setInstrumentVisibility('piano', isVisible);
    });
  }

  onInstrumentsChange(instruments: string[]) {
    this.uiService.setShowGuitar(instruments.includes('guitar'));
    this.uiService.setShowPiano(instruments.includes('piano'));
  }

  toggleDarkTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  private applyTheme() {
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
  }

  private setInstrumentVisibility(instrument: string, isVisible: boolean) {
    this.visibleInstruments = isVisible
      ? [...new Set([...this.visibleInstruments, instrument])]
      : this.visibleInstruments.filter((item) => item !== instrument);
  }
}
