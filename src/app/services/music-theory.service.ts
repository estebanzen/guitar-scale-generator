import { Injectable } from '@angular/core';
import { IntervalPattern, Note } from 'src/app/common/music.types';

@Injectable({ providedIn: 'root' })
export class MusicTheoryService {
  /** Aplica una fórmula de intervalos a las notas usando la raíz indicada. */
  applyIntervals(notes: Note[], rootIndex: number, intervals: number[]) {
    const activeIndices = new Set(
      intervals.map((interval) => (rootIndex + interval) % 12),
    );
    notes.forEach((note, index) => {
      note.root = index === rootIndex;
      note.active = activeIndices.has(index);
    });
  }

  /** Devuelve los índices cromáticos que están activos en este momento. */
  activeIndices(notes: Note[]): number[] {
    return notes
      .map((note, index) => (note.active ? index : -1))
      .filter((index) => index >= 0);
  }

  /** Convierte los índices activos en intervalos ordenados respecto de la raíz. */
  intervalsFromRoot(activeIndices: number[], rootIndex: number): number[] {
    return activeIndices
      .map((index) => (index - rootIndex + 12) % 12)
      .sort((a, b) => a - b);
  }

  /** Busca el primer patrón de escala o acorde que coincida exactamente con los intervalos. */
  findPattern<T extends IntervalPattern>(
    patterns: T[],
    intervals: number[],
  ): T | undefined {
    return patterns.find((pattern) =>
      this.matchesIntervals(pattern.intervals, intervals),
    );
  }

  /** Indica si una nota pertenece a alguno de los intervalos pedidos desde la raíz. */
  hasInterval(
    notes: Note[],
    note: Note,
    rootIndex: number,
    intervals: number[],
  ): boolean {
    const noteIndex = notes.findIndex((item) => item.noteStr === note.noteStr);
    return (
      noteIndex >= 0 && intervals.includes((noteIndex - rootIndex + 12) % 12)
    );
  }

  /** Compara dos fórmulas de intervalos ordenadas para ver si son iguales. */
  private matchesIntervals(expected: number[], actual: number[]): boolean {
    return (
      expected.length === actual.length &&
      expected.every((interval, index) => interval === actual[index])
    );
  }
}
