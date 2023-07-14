const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const getNoteAtFret = (rootNote: string, fretNumber: number): string => {
  const rootIndex = notes.indexOf(rootNote);
  const noteIndex = (rootIndex + fretNumber) % notes.length;
  return notes[noteIndex];
};

export { getNoteAtFret };
