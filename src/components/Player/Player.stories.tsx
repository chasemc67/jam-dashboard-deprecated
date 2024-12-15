import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import Player from './Player';

interface PlayerProps {
  notes: string[];
}

export default {
  title: 'Components/Player',
  component: Player,
} as Meta;

const Template: Story<PlayerProps> = args => {
  const [notes, setNotes] = useState(['C4', 'E4', 'G4']);
  const [inputValue, setInputValue] = useState('C4,E4,G4');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const newNotes = value.split(',').map(note => note.trim());
    setNotes(newNotes);
  };

  return (
    <div style={{ padding: '20px' }}>
      <label>
        Enter notes (comma-separated, e.g. C4,E4,G4):{' '}
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <Player notes={notes} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  notes: ['C4', 'E4', 'G4'],
};

export const MinorChord = Template.bind({});
MinorChord.args = {
  notes: ['A4', 'C5', 'E5'],
};
