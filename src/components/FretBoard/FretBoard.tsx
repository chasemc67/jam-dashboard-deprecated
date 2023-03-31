// FretBoard.tsx
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Fret, { FretProps, HighlightedNote } from '../Fret/Fret';

const FretBoardContainer = styled.div`
  display: flex;
`;

export type FretBoardProps = {
  rootNotes: string[];
  highlightedNotes: HighlightedNote[];
};

const FretBoard: FunctionComponent<FretBoardProps> = ({ rootNotes, highlightedNotes }) => {
  const renderFrets = () => {
    return rootNotes.map((rootNote, index) => (
      <Fret key={index} rootNote={rootNote} fretNumber={index} highlightedNotes={highlightedNotes} />
    ));
  };

  return <FretBoardContainer>{renderFrets()}</FretBoardContainer>;
};

export default FretBoard;
