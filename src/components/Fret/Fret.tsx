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
  showTextNotes?: boolean;
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

const FretString = styled.div`
  height: 2px;
  background-color: #808080;
  position: relative;
`;

const NoteCircle = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  position: absolute;
  top: -9px;
  left: calc(50% - 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const Fret: FunctionComponent<FretProps> = ({ rootNotes, fretNumber, highlightedNotes, showTextNotes }) => {
  const renderStrings = () => {
    return rootNotes.map((rootNote, index) => {
      const currentNote = getNoteAtFret(rootNote, fretNumber);
      const highlightedNote = highlightedNotes.find((hn) => hn.note === currentNote);

      return (
        <FretString key={index}>
          {highlightedNote && (
            <NoteCircle color={highlightedNote.color}>
              {showTextNotes && currentNote}
            </NoteCircle>
          )}
        </FretString>
      );
    });
  };

  return <FretContainer>{renderStrings()}{fretNumber}</FretContainer>;
};

export default Fret;
