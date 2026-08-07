export interface ChordType {
  name: string;
  shortName: string;
  intervals: number[];
  formula: string;
}

export const CHORD_TYPES: ChordType[] = [
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
