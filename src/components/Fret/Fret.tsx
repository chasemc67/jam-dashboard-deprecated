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

const getFretWidth = (fretNumber: number): string => {
  const baseWidth = 120;
  const factor = 0.94;
  return `${baseWidth * Math.pow(factor, fretNumber)}px`;
};

const FretContainer = styled.div<{ fretWidth: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f0e9e2;
  border: 1px solid #c0b7a8;
  padding: 10px;
  position: relative;
  width: ${(props) => props.fretWidth};
  height: 300px;
`;

const FretString = styled.div`
  height: 2px;
  background-color: #808080;
  position: relative;
  z-index: 2;
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
  z-index: 3;
`;

const FretMarker = styled.div<{ tallMarker?: boolean }>`
  background-color: #aaa;
  width: 75%;
  height: ${(props) => (props.tallMarker ? '50%' : '25%')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
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

  const fretWidth = getFretWidth(fretNumber);
  const fretMarkers = [3, 5, 7, 9, 12, 15, 17, 19, 24];
  const tallMarkerFrets = [12, 24];

  return (
    <FretContainer fretWidth={fretWidth}>
      {renderStrings()}
      {fretMarkers.includes(fretNumber) && (
        <FretMarker tallMarker={tallMarkerFrets.includes(fretNumber)} />
      )}
    </FretContainer>
  );
};

export default Fret;
