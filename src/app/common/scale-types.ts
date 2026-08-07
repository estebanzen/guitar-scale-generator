export interface ScaleType {
  id: string;
  name: string;
  shortName: string;
  intervals: number[];
}

export const SCALE_TYPES: ScaleType[] = [
  {
    id: 'major',
    name: 'Major',
    shortName: 'maj',
    intervals: [0, 2, 4, 5, 7, 9, 11],
  },
  {
    id: 'minor',
    name: 'Minor',
    shortName: 'min',
    intervals: [0, 2, 3, 5, 7, 8, 10],
  },
  {
    id: 'majorPentatonic',
    name: 'Major Pentatonic',
    shortName: 'maj pent',
    intervals: [0, 2, 4, 7, 9],
  },
  {
    id: 'minorPentatonic',
    name: 'Minor Pentatonic',
    shortName: 'min pent',
    intervals: [0, 3, 5, 7, 10],
  },
  {
    id: 'blues',
    name: 'Blues',
    shortName: 'blues',
    intervals: [0, 3, 5, 6, 7, 10],
  },
  {
    id: 'ionian',
    name: 'Ionian (Major)',
    shortName: 'ion',
    intervals: [0, 2, 4, 5, 7, 9, 11],
  },
  {
    id: 'dorian',
    name: 'Dorian',
    shortName: 'dor',
    intervals: [0, 2, 3, 5, 7, 9, 10],
  },
  {
    id: 'phrygian',
    name: 'Phrygian',
    shortName: 'phr',
    intervals: [0, 1, 3, 5, 7, 8, 10],
  },
  {
    id: 'lydian',
    name: 'Lydian',
    shortName: 'lyd',
    intervals: [0, 2, 4, 6, 7, 9, 11],
  },
  {
    id: 'mixolydian',
    name: 'Mixolydian',
    shortName: 'mix',
    intervals: [0, 2, 4, 5, 7, 9, 10],
  },
  {
    id: 'aeolian',
    name: 'Aeolian (Minor)',
    shortName: 'aeo',
    intervals: [0, 2, 3, 5, 7, 8, 10],
  },
  {
    id: 'locrian',
    name: 'Locrian',
    shortName: 'loc',
    intervals: [0, 1, 3, 5, 6, 8, 10],
  },
  {
    id: 'harmonicMinor',
    name: 'Harmonic Minor',
    shortName: 'harm min',
    intervals: [0, 2, 3, 5, 7, 8, 11],
  },
  {
    id: 'harmonicMinorHexatonic',
    name: 'Harmonic Minor Hexatonic (omit 4)',
    shortName: 'harm min hex',
    intervals: [0, 2, 3, 7, 8, 11],
  },
  {
    id: 'arabic',
    name: 'Arabic (Double Harmonic)',
    shortName: 'arabic',
    intervals: [0, 1, 4, 5, 7, 8, 11],
  },
  {
    id: 'phrygianDominant',
    name: 'Phrygian Dominant',
    shortName: 'phr dom',
    intervals: [0, 1, 4, 5, 7, 8, 10],
  },
  {
    id: 'hungarianMinor',
    name: 'Hungarian Minor',
    shortName: 'hung min',
    intervals: [0, 2, 3, 6, 7, 8, 11],
  },
  {
    id: 'persian',
    name: 'Persian',
    shortName: 'persian',
    intervals: [0, 1, 4, 5, 6, 8, 11],
  },
  {
    id: 'wholeTone',
    name: 'Whole Tone',
    shortName: 'whole',
    intervals: [0, 2, 4, 6, 8, 10],
  },
  {
    id: 'diminishedHalfWhole',
    name: 'Diminished (Half-Whole)',
    shortName: 'dim h-w',
    intervals: [0, 1, 3, 4, 6, 7, 9, 10],
  },
  {
    id: 'hirajoshi',
    name: 'Hirajoshi (Japanese)',
    shortName: 'hirajoshi',
    intervals: [0, 2, 3, 7, 8],
  },
  {
    id: 'inSen',
    name: 'In Sen (Japanese)',
    shortName: 'in sen',
    intervals: [0, 1, 5, 7, 10],
  },
  {
    id: 'iwato',
    name: 'Iwato (Japanese)',
    shortName: 'iwato',
    intervals: [0, 1, 5, 6, 10],
  },
  {
    id: 'yo',
    name: 'Yo (Japanese)',
    shortName: 'yo',
    intervals: [0, 2, 5, 7, 9],
  },
  {
    id: 'chinesePentatonic',
    name: 'Chinese Pentatonic',
    shortName: 'chinese',
    intervals: [0, 2, 4, 7, 9],
  },
];
