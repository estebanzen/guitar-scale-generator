export interface Note {
  noteStr: string;
  active: boolean;
  root: boolean;
  classes?: string;
}

export interface IntervalPattern {
  intervals: number[];
}
