// FretboardControls.tsx
import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import FretBoard, { FretBoardProps } from '../FretBoard';

const FretboardControlsContainer = styled.div<{ isLeftHanded: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.isLeftHanded ? 'row-reverse' : 'row')};
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 330px;
`;

const TextInput = styled.input`
  width: 30px;
  height: 30px;
  text-align: center;
`;

const StringInput = styled.div`
  display: flex;
  align-items: start;
  height: calc(100% / 6);
`;

const FretboardControls: FunctionComponent = () => {
  const [rootNotes, setRootNotes] = useState(['E', 'A', 'D', 'G', 'B', 'E']);

  const highlightedNotes = [
    { note: 'C', color: 'blue' },
    { note: 'D', color: 'red' },
    { note: 'E', color: 'green' },
    { note: 'F', color: 'orange' },
    { note: 'G', color: 'brown' },
    { note: 'A', color: 'purple' },
    { note: 'B', color: 'teal' },
  ];
  const numberOfFrets = 12;
  const startingFret = 0;
  const showTextNotes = true;
  const isLeftHanded = false;

  const handleInputChange = (index: number, value: string) => {
    const updatedRootNotes = [...rootNotes];
    updatedRootNotes[index] = value;
    setRootNotes(updatedRootNotes);
  };

  const renderInputs = () => {
    return rootNotes.map((note, index) => (
      <StringInput key={index}>
        <TextInput
          value={note}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      </StringInput>
    ));
  };

  return (
    <FretboardControlsContainer isLeftHanded={isLeftHanded}>
      <InputContainer>{renderInputs()}</InputContainer>
      <FretBoard
        rootNotes={rootNotes}
        highlightedNotes={highlightedNotes}
        numberOfFrets={numberOfFrets}
        startingFret={startingFret}
        showTextNotes={showTextNotes}
        isLeftHanded={isLeftHanded}
      />
    </FretboardControlsContainer>
  );
};

export default FretboardControls;
