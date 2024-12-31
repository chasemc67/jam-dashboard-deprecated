import React, { useState, useEffect } from 'react';
import { ChordType, Chord } from 'tonal';
import Select from 'react-select';
import Player from './Player';
import { getEveryChordInScale } from '../../utils/scaleChords';

// Define all possible keys (using just major scales for now)
const possibleKeys = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
].map(note => `${note} major`);

interface ChordTypeGroup {
  label: string;
  value: string[];
}

const chordTypeGroups: ChordTypeGroup[] = [
  {
    label: 'Simple Triads',
    value: ['maj', 'min'],
  },
  {
    label: 'Seventh Chords',
    value: ['7', 'maj7', 'min7', 'dim7'],
  },
  {
    label: 'Extended Chords',
    value: ['9', '11', '13', 'maj9', 'min9'],
  },
  {
    label: 'Suspended Chords',
    value: ['sus2', 'sus4'],
  },
  {
    label: 'Augmented & Diminished',
    value: ['aug', 'dim'],
  },
];

const RandomPlayer: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('C major');
  const [selectedChordGroups, setSelectedChordGroups] = useState<
    ChordTypeGroup[]
  >([
    chordTypeGroups[0], // Start with Simple Triads selected
  ]);
  const [currentChord, setCurrentChord] = useState<string[]>([
    'C4',
    'E4',
    'G4',
  ]); // C major chord as default
  const [currentChordName, setCurrentChordName] = useState<string>('C major');
  const [showNotes, setShowNotes] = useState<boolean>(false);

  // Compute the active chord types from the selected groups
  const getActiveChordTypes = () => {
    return Array.from(
      new Set(selectedChordGroups.flatMap(group => group.value)),
    );
  };

  const generateRandomChord = () => {
    // Get all possible chords in the selected key
    const chordsInKey = getEveryChordInScale(
      selectedKey,
      getActiveChordTypes(),
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
        <div style={{ marginBottom: '10px' }}>
          <label>
            Key:
            <select
              value={selectedKey}
              onChange={e => setSelectedKey(e.target.value)}
              style={{ marginLeft: '10px' }}
            >
              {possibleKeys.map(key => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <div>Chord Types:</div>
          <div style={{ width: '300px' }}>
            <Select
              isMulti
              closeMenuOnSelect={false}
              name="chord-types"
              options={chordTypeGroups}
              value={selectedChordGroups}
              onChange={handleChordGroupChange}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          </div>
        </div>

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
