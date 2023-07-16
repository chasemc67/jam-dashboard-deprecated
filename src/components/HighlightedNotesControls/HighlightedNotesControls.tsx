// HighlightedNotesControls.tsx
import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const TextInput = styled.input`
  width: 200px;
  height: 30px;
  margin-bottom: 10px;
`;

const NoteButton = styled.button<{ backgroundColor: string }>`
  width: 30px;
  height: 30px;
  background-color: ${props => props.backgroundColor};
  margin-right: 5px;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ColorPicker = styled.select`
  width: 60%;
`;

const colors = [
  { name: 'Grey', value: 'grey' },
  { name: 'Blue', value: 'blue' },
  { name: 'Red', value: 'red' },
  { name: 'Green', value: 'green' },
  { name: 'Orange', value: 'orange' },
  { name: 'Brown', value: 'brown' },
  { name: 'Purple', value: 'purple' },
  { name: 'Teal', value: 'teal' },
];

interface HighlightedNote {
  note: string;
  color: string;
}

export type HighlightedNotesControlsProps = {
  highlightedNotes: HighlightedNote[];
  setHighlightedNotes: (notes: HighlightedNote[]) => void;
};

const HighlightedNotesControls: FunctionComponent<HighlightedNotesControlsProps> =
  ({ highlightedNotes, setHighlightedNotes }) => {
    const [inputValue, setInputValue] = useState(
      highlightedNotes.map(n => n.note).join(', '),
    );

    const handleInputChange = (value: string) => {
      setInputValue(value);

      const notes = value
        .split(',')
        .map(note => note.trim().toUpperCase())
        .filter(note => note);

      const updatedHighlightedNotes = notes.map(note => {
        const existingNote = highlightedNotes.find(n => n.note === note);
        return existingNote || { note, color: 'grey' };
      });

      setHighlightedNotes(updatedHighlightedNotes);
    };

    const handleColorChange = (note: string, color: string) => {
      const updatedHighlightedNotes = highlightedNotes.map(n =>
        n.note === note ? { ...n, color } : n,
      );

      setHighlightedNotes(updatedHighlightedNotes);
    };

    const renderColorPicker = (note: string, currentColor: string) => (
      <ColorPicker
        value={currentColor}
        onChange={e => handleColorChange(note, e.target.value)}
      >
        {colors.map(color => (
          <option key={color.value} value={color.value}>
            {color.name}
          </option>
        ))}
      </ColorPicker>
    );

    return (
      <Container>
        <TextInput
          value={inputValue}
          onChange={e => handleInputChange(e.target.value)}
          placeholder="Enter comma-separated notes"
        />
        <ButtonsContainer>
          {highlightedNotes.map((highlightedNote, index) => (
            <div>
              <NoteButton key={index} backgroundColor={highlightedNote.color}>
                {highlightedNote.note}
              </NoteButton>
              {renderColorPicker(highlightedNote.note, highlightedNote.color)}
            </div>
          ))}
        </ButtonsContainer>
      </Container>
    );
  };

export default HighlightedNotesControls;
