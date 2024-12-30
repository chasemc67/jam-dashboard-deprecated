import { Scale, Chord, Note } from 'tonal';

type ScaleNote = string;

/**
 * Get all triads within a scale
 * @param key The root note of the scale (e.g., "C")
 * @param scale The scale type (e.g., "major", "minor")
 * @returns Array of chord symbols (e.g., ["C", "Dm", "Em", "F", "G", "Am", "Bdim"])
 */
export const getScaleTriads = (
  key: string,
  scale: string = 'major',
): string[] => {
  const scaleInfo = Scale.get(`${key} ${scale}`);
  return scaleInfo.notes
    .map((note: ScaleNote) => {
      const chord = Chord.getChord('', note, `${key} ${scale}`);
      return chord.symbol;
    })
    .filter(Boolean);
};

/**
 * Get all seventh chords within a scale
 * @param key The root note of the scale
 * @param scale The scale type
 * @returns Array of seventh chord symbols (e.g., ["Cmaj7", "Dm7", "Em7", "Fmaj7", "G7", "Am7", "Bm7b5"])
 */
export const getScaleSeventhChords = (
  key: string,
  scale: string = 'major',
): string[] => {
  const scaleInfo = Scale.get(`${key} ${scale}`);
  return scaleInfo.notes
    .map((note: ScaleNote) => {
      const chord = Chord.getChord('7', note, `${key} ${scale}`);
      return chord.symbol;
    })
    .filter(Boolean);
};

/**
 * Get all suspended chords within a scale
 * @param key The root note of the scale
 * @param scale The scale type
 * @returns Array of suspended chord symbols (e.g., ["Csus2", "Csus4", "Gsus4"])
 */
export const getScaleSuspendedChords = (
  key: string,
  scale: string = 'major',
): string[] => {
  const scaleInfo = Scale.get(`${key} ${scale}`);
  const validChords: string[] = [];

  scaleInfo.notes.forEach((note: ScaleNote) => {
    // For each note, try both sus2 and sus4
    const sus2Notes = [
      note,
      Note.transpose(note, '2M'),
      Note.transpose(note, '5P'),
    ];
    const sus4Notes = [
      note,
      Note.transpose(note, '4P'),
      Note.transpose(note, '5P'),
    ];

    // Check if all notes for sus2 are in the scale
    if (sus2Notes.every((n: string) => scaleInfo.notes.includes(n))) {
      validChords.push(`${note}sus2`);
    }

    // Check if all notes for sus4 are in the scale
    if (sus4Notes.every((n: string) => scaleInfo.notes.includes(n))) {
      validChords.push(`${note}sus4`);
    }
  });

  return validChords;
};

/**
 * Get all ninth chords within a scale
 * @param key The root note of the scale
 * @param scale The scale type
 * @returns Array of ninth chord symbols (e.g., ["Cmaj9", "Dm9", "Em9"])
 */
export const getScaleNinthChords = (
  key: string,
  scale: string = 'major',
): string[] => {
  const scaleInfo = Scale.get(`${key} ${scale}`);
  return scaleInfo.notes
    .map((note: ScaleNote) => {
      const chord = Chord.getChord('9', note, `${key} ${scale}`);
      return chord.notes.every((n: string) => scaleInfo.notes.includes(n))
        ? chord.symbol
        : null;
    })
    .filter(Boolean);
};

/**
 * Get all eleventh chords within a scale
 * @param key The root note of the scale
 * @param scale The scale type
 * @returns Array of eleventh chord symbols
 */
export const getScaleEleventhChords = (
  key: string,
  scale: string = 'major',
): string[] => {
  const scaleInfo = Scale.get(`${key} ${scale}`);
  return scaleInfo.notes
    .map((note: ScaleNote) => {
      const chord = Chord.getChord('11', note, `${key} ${scale}`);
      return chord.notes.every((n: string) => scaleInfo.notes.includes(n))
        ? chord.symbol
        : null;
    })
    .filter(Boolean);
};

/**
 * Get all thirteenth chords within a scale
 * @param key The root note of the scale
 * @param scale The scale type
 * @returns Array of thirteenth chord symbols
 */
export const getScaleThirteenthChords = (
  key: string,
  scale: string = 'major',
): string[] => {
  const scaleInfo = Scale.get(`${key} ${scale}`);
  return scaleInfo.notes
    .map((note: ScaleNote) => {
      const chord = Chord.getChord('13', note, `${key} ${scale}`);
      return chord.notes.every((n: string) => scaleInfo.notes.includes(n))
        ? chord.symbol
        : null;
    })
    .filter(Boolean);
};

/**
 * Get all altered dominant chords within a scale
 * @param key The root note of the scale
 * @param scale The scale type
 * @returns Array of altered dominant chord symbols
 */
export const getScaleAlteredDominantChords = (
  key: string,
  scale: string = 'major',
): string[] => {
  const scaleInfo = Scale.get(`${key} ${scale}`);
  return scaleInfo.notes
    .map((note: ScaleNote) => {
      const chord = Chord.getChord('7alt', note, `${key} ${scale}`);
      return chord.notes.every((n: string) => scaleInfo.notes.includes(n))
        ? chord.symbol
        : null;
    })
    .filter(Boolean);
};

/**
 * Get all augmented chords within a scale
 * @param key The root note of the scale
 * @param scale The scale type
 * @returns Array of augmented chord symbols
 */
export const getScaleAugmentedChords = (
  key: string,
  scale: string = 'major',
): string[] => {
  const scaleInfo = Scale.get(`${key} ${scale}`);
  return scaleInfo.notes
    .map((note: ScaleNote) => {
      const chord = Chord.getChord('aug', note, `${key} ${scale}`);
      return chord.notes.every((n: string) => scaleInfo.notes.includes(n))
        ? chord.symbol
        : null;
    })
    .filter(Boolean);
};

/**
 * Get all diminished seventh chords within a scale
 * @param key The root note of the scale
 * @param scale The scale type
 * @returns Array of diminished seventh chord symbols
 */
export const getScaleDiminishedSeventhChords = (
  key: string,
  scale: string = 'major',
): string[] => {
  const scaleInfo = Scale.get(`${key} ${scale}`);
  return scaleInfo.notes
    .map((note: ScaleNote) => {
      const chord = Chord.getChord('dim7', note, `${key} ${scale}`);
      return chord.notes.every((n: string) => scaleInfo.notes.includes(n))
        ? chord.symbol
        : null;
    })
    .filter(Boolean);
};
