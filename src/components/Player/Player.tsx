import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';

interface PlayerProps {
  chordInput: string;
}

const Player: React.FC<PlayerProps> = ({ chordInput }) => {
  const [chord, setChord] = useState<string[]>([]);
  const synthRef = useRef<Tone.Synth | null>(null);

  useEffect(() => {
    if (!synthRef.current) {
      synthRef.current = new Tone.Synth().toDestination();
    }
  }, []);

  const generateRandomChord = () => {
    const notesPool = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
    const chordNotes: string[] = [];

    while (chordNotes.length < 3) {
      const note = notesPool[Math.floor(Math.random() * notesPool.length)];
      if (!chordNotes.includes(note)) {
        chordNotes.push(note);
      }
    }

    setChord(chordNotes);
  };

  useEffect(() => {
    // In a real implementation, you'd parse chordInput into notes.
    // For now, just regenerate a random chord on input change.
    generateRandomChord();
  }, [chordInput]);

  const playChord = async () => {
    // Ensure audio context is started
    await Tone.start();
    const now = Tone.now();
    if (synthRef.current) {
      chord.forEach((note, i) => {
        synthRef.current?.triggerAttackRelease(note, '2n', now + 0.1 * i);
      });
    }
  };

  return (
    <div>
      <p>Chord: {chord.join(' - ')}</p>
      <button onClick={playChord}>Play Chord</button>
    </div>
  );
};

export default Player;
