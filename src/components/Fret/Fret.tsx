// Fret.tsx
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

export type HighlightedNote = {
  note: string;
  color: string;
};

export type FretProps = {
  rootNote: string;
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

const FretString = styled.div`
  height: 2px;
  background-color: #808080;
`;

const Fret: FunctionComponent<FretProps> = ({ rootNote, fretNumber, highlightedNotes }) => {
  return (
    <FretContainer>
      <FretString />
      <FretString />
      <FretString />
      <FretString />
      <FretString />
      <FretString />
    </FretContainer>
  );
};

export default Fret;