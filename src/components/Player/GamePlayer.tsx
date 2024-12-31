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

interface GameChord {
  notes: string[];
  name: string;
  userGuess?: string;
  isCorrect?: boolean;
}

const GamePlayer: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('C major');
  const [selectedChordGroups, setSelectedChordGroups] = useState<
    ChordTypeGroup[]
  >([
    chordTypeGroups[1], // Start with Seventh Chords selected
  ]);
  const [gameStarted, setGameStarted] = useState(false);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [gameChords, setGameChords] = useState<GameChord[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameComplete, setGameComplete] = useState(false);

  const generateGameChords = () => {
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

    // Pick 10 random chords
    const selectedChords: GameChord[] = [];
    const usedIndices = new Set<number>();

    while (
      selectedChords.length < 10 &&
      usedIndices.size < allPossibleChords.length
    ) {
      const randomIndex = Math.floor(Math.random() * allPossibleChords.length);
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        const chordName = allPossibleChords[randomIndex];
        const chordNotes = Chord.get(chordName).notes;
        const notesWithOctave = chordNotes.map(note => `${note}4`);
        selectedChords.push({
          notes: notesWithOctave,
          name: chordName,
        });
      }
    }

    setGameChords(selectedChords);
    setCurrentChordIndex(0);
    setGameStarted(true);
    setGameComplete(false);
    setCurrentGuess('');
  };

  const handleChordGroupChange = (
    selectedOptions: readonly ChordTypeGroup[],
  ) => {
    setSelectedChordGroups([...selectedOptions]);
  };

  const handleGuessSubmit = () => {
    if (!gameStarted || currentChordIndex >= gameChords.length) return;

    const currentChord = gameChords[currentChordIndex];
    const normalizedGuess = currentGuess.trim().toLowerCase();
    const normalizedAnswer = currentChord.notes
      .map(note => note.slice(0, -1))
      .join(' ')
      .toLowerCase();

    const updatedChords = [...gameChords];
    updatedChords[currentChordIndex] = {
      ...currentChord,
      userGuess: currentGuess,
      isCorrect: normalizedGuess === normalizedAnswer,
    };
    setGameChords(updatedChords);

    if (currentChordIndex === gameChords.length - 1) {
      setGameComplete(true);
    } else {
      setCurrentChordIndex(currentChordIndex + 1);
      setCurrentGuess('');
    }
  };

  const getScore = () => {
    return gameChords.filter(chord => chord.isCorrect).length;
  };

  const currentChord =
    gameStarted && currentChordIndex < gameChords.length
      ? gameChords[currentChordIndex]
      : null;

  return (
    <div style={{ padding: '20px' }}>
      {!gameStarted ? (
        <div>
          <ChordSelectionControls
            selectedKey={selectedKey}
            onKeyChange={setSelectedKey}
            selectedChordGroups={selectedChordGroups}
            onChordGroupsChange={handleChordGroupChange}
          />
          <button onClick={generateGameChords}>Start Game</button>
        </div>
      ) : (
        <div>
          <h3>Chord {currentChordIndex + 1} of 10</h3>
          {currentChord && !gameComplete && (
            <div>
              <Player notes={currentChord.notes} />
              <div style={{ marginTop: '20px' }}>
                <input
                  type="text"
                  value={currentGuess}
                  onChange={e => setCurrentGuess(e.target.value)}
                  placeholder="Enter the notes (e.g. C E G)"
                  style={{ marginRight: '10px' }}
                />
                <button onClick={handleGuessSubmit}>Submit Guess</button>
              </div>
            </div>
          )}

          {gameComplete && (
            <div>
              <h2>Game Complete!</h2>
              <p>Your score: {getScore()} out of 10</p>
              <div style={{ marginTop: '20px' }}>
                <h3>Results:</h3>
                {gameChords.map((chord, index) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <div>
                      Chord {index + 1}: {chord.name}
                    </div>
                    <div>
                      Correct notes:{' '}
                      {chord.notes.map(note => note.slice(0, -1)).join(' ')}
                    </div>
                    <div>Your guess: {chord.userGuess}</div>
                    <div style={{ color: chord.isCorrect ? 'green' : 'red' }}>
                      {chord.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={generateGameChords}>Play Again</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GamePlayer;
