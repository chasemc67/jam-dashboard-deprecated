import React, { useState } from 'react';
import { Chord } from 'tonal';
import Player from './Player';
import { getEveryChordInScale } from '../../utils/scaleChords';
import {
  ChordTypeGroup,
  chordTypeGroups,
  getActiveChordTypes,
} from '../../utils/chordPlayerUtils';
import ChordSelectionControls from './ChordSelectionControls';

const RandomPlayer: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('C major');
  const [selectedChordGroups, setSelectedChordGroups] = useState<
    ChordTypeGroup[]
  >([
    chordTypeGroups[1], // Start with Simple Triads selected
  ]);
  const [currentChord, setCurrentChord] = useState<string[]>([
    'C4',
    'E4',
    'G4',
  ]); // C major chord as default
  const [currentChordName, setCurrentChordName] = useState<string>('C major');
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const generateRandomChord = () => {
    // Get all possible chords in the selected key
    const chordsInKey = getEveryChordInScale(
      selectedKey,
      getActiveChordTypes(selectedChordGroups),
    );

    // Flatten the array of chords and filter out any null values
    const allPossibleChords = chordsInKey
      .flatMap(noteChords => noteChords.chords)
      .filter((chord): chord is string => chord !== null);

    if (allPossibleChords.length === 0) return;

    // Pick a random chord
    const randomChord =
      allPossibleChords[Math.floor(Math.random() * allPossibleChords.length)];

    // Get the notes of the chord using Tonal
    const chordNotes = Chord.get(randomChord).notes;

    // Convert to the format needed by the Player (adding octave 4)
    const notesWithOctave = chordNotes.map(note => `${note}4`);

    setCurrentChord(notesWithOctave);
    setCurrentChordName(randomChord);
  };

  const handleChordGroupChange = (
    selectedOptions: readonly ChordTypeGroup[],
  ) => {
    setSelectedChordGroups([...selectedOptions]);
  };

  const toggleNotes = () => {
    setShowNotes(!showNotes);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <ChordSelectionControls
          selectedKey={selectedKey}
          onKeyChange={setSelectedKey}
          selectedChordGroups={selectedChordGroups}
          onChordGroupsChange={handleChordGroupChange}
        />

        <button onClick={generateRandomChord}>Generate</button>
        <button onClick={toggleNotes}>Reveal</button>
        {showNotes && (
          <div style={{ marginTop: '10px' }}>
            <div>Chord: {currentChordName}</div>
            <div>
              Notes: {currentChord.map(note => note.slice(0, -1)).join(' - ')}
            </div>
          </div>
        )}
      </div>
      <Player notes={currentChord} />
    </div>
  );
};

export default RandomPlayer;
