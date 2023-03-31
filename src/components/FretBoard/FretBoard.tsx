// FretBoard.tsx
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Fret, { FretProps, HighlightedNote } from '../Fret';

const FretBoardContainer = styled.div`
  display: flex;
`;

export type FretBoardProps = {
  rootNotes: string[];
  highlightedNotes: HighlightedNote[];
  numberOfFrets: number;
  startingFret: number;
  showTextNotes?: boolean;
};

const FretBoard: FunctionComponent<FretBoardProps> = ({ rootNotes, highlightedNotes, numberOfFrets, startingFret, showTextNotes }) => {
  const renderFrets = () => {
    const frets = [];
    for (let i = 0; i < numberOfFrets; i++) {
      frets.push(
        <Fret
          key={i}
          rootNotes={rootNotes} // Pass the entire rootNotes array to each Fret
          fretNumber={startingFret + i} // Use startingFret to calculate the fretNumber for each Fret
          highlightedNotes={highlightedNotes}
          showTextNotes={showTextNotes}
        />
      );
    }
    return frets;
  };

  return <FretBoardContainer>{renderFrets()}</FretBoardContainer>;
};

export default FretBoard;
