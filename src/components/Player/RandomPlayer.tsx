import React, { useState } from 'react';
import Player from './Player';

// Define all possible notes for random generation
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const octaves = [3, 4, 5];

const RandomPlayer: React.FC = () => {
  const [currentChord, setCurrentChord] = useState<string[]>([
    'C4',
    'E4',
    'G4',
  ]); // C major chord as default
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const generateRandomChord = () => {
    // Randomly select a root note and octave
    const rootIndex = Math.floor(Math.random() * notes.length);
    const octave = octaves[Math.floor(Math.random() * octaves.length)];
    const root = notes[rootIndex];

    // Generate a triad (root, third, fifth)
    const third = notes[(rootIndex + 4) % 12]; // Major third (4 semitones up)
    const fifth = notes[(rootIndex + 7) % 12]; // Perfect fifth (7 semitones up)

    setCurrentChord([
      `${root}${octave}`,
      `${third}${octave}`,
      `${fifth}${octave}`,
    ]);
  };

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={generateRandomChord}>Generate</button>
        <button onClick={toggleNotes}>Reveal</button>
        {showNotes && (
          <div style={{ marginTop: '10px' }}>
            Current Chord: {currentChord.join(' - ')}
          </div>
        )}
      </div>
      <Player notes={currentChord} />
    </div>
  );
};

export default RandomPlayer;
