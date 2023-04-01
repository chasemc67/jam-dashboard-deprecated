import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

const HighlightedNotesControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextInput = styled.input`
  width: 100%;
`;

const ColorButton = styled.div<{ color: string }>`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const ColorButtonsContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ColorDropdown = styled.select`
  position: absolute;
`;

export type HighlightedNotesControlsProps = {
  highlightedNotes: { note: string; color: string }[];
  setHighlightedNotes: (notes: { note: string; color: string }[]) => void;
}

const HighlightedNotesControls: FunctionComponent<HighlightedNotesControlsProps> = ({
  highlightedNotes,
  setHighlightedNotes,
}) => {
  const [textInputValue, setTextInputValue] = useState('');
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
    null
  );

  const handleInputChange = (value: string) => {
    setTextInputValue(value);
    const notes = value.split(',').map((note) => note.trim());
    const newHighlightedNotes = notes.map((note) => ({
      note,
      color: 'grey',
    }));
    setHighlightedNotes(newHighlightedNotes);
  };

  const handleColorChange = (index: number, color: string) => {
    const updatedHighlightedNotes = [...highlightedNotes];
    updatedHighlightedNotes[index].color = color;
    setHighlightedNotes(updatedHighlightedNotes);
    setSelectedColorIndex(null);
  };

  const renderColorButtons = () => {
    return highlightedNotes.map((highlightedNote, index) => (
      <ColorButton
        key={index}
        color={highlightedNote.color}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedColorIndex(index);
        }}
        role="button"
      >
        {highlightedNote.note}
        {selectedColorIndex === index && (
          <ColorDropdown
            onChange={(e) => {
              handleColorChange(index, e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="default">Default</option>
            <option value="blue">Blue</option>
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="orange">Orange</option>
            <option value="brown">Brown</option>
            <option value="purple">Purple</option>
            <option value="teal">Teal</option>
          </ColorDropdown>
        )}
      </ColorButton>
    ));
  };

  return (
    <HighlightedNotesControlsContainer>
      <TextInput
        value={textInputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Enter comma-separated notes (e.g. C, D, E, F)"
      />
      <ColorButtonsContainer>{renderColorButtons()}</ColorButtonsContainer>
    </HighlightedNotesControlsContainer>
  );
};

export default HighlightedNotesControls;
