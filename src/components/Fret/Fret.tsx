// Fret.tsx
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { getNoteAtFret } from '../../utils/musicTheoryUtils';

export type HighlightedNote = {
  note: string;
  color: string;
};

export type FretProps = {
  rootNotes: string[];
  fretNumber: number;
  highlightedNotes: HighlightedNote[];
};

const FretContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f0e9e2;
  border: 1px solid #c0b7a8;
  padding: 10px;
  width: 80px;
  height: 300px;
`;

const FretString = styled.div<{ highlighted: boolean; noteColor: string }>`
  position: relative;
  height: 2px;
  background-color: #808080;

  &:before {
    content: ${({ highlighted }) => (highlighted ? '""' : 'none')};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background-color: ${({ noteColor }) => noteColor};
    border-radius: 50%;
    top: -9px;
  }
`;

const Fret: FunctionComponent<FretProps> = ({ rootNotes, fretNumber, highlightedNotes }) => {
  const isHighlighted = (note: string): HighlightedNote | undefined => {
    return highlightedNotes.find((highlightedNote) => highlightedNote.note === note);
  };

  const renderStrings = () => {
    return rootNotes.map((note, index) => {
      const fretNote = getNoteAtFret(note, fretNumber);
      const highlightedNote = isHighlighted(fretNote);
      return (
        <FretString
          key={index}
          highlighted={!!highlightedNote}
          noteColor={highlightedNote?.color || 'transparent'}
        />
      );
    });
  };

  return <FretContainer>{renderStrings()}</FretContainer>;
};

export default Fret;
