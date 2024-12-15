// src/components/Player/Player.stories.tsx
import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import Player from './Player';

interface PlayerProps {
  chordInput: string;
}

export default {
  title: 'Components/Player',
  component: Player,
} as Meta;

const Template: Story<PlayerProps> = args => {
  const [chordInput, setChordInput] = useState('Cmaj7');

  return (
    <div style={{ padding: '20px' }}>
      <label>
        Enter a chord name (e.g. Cmaj7):{' '}
        <input
          type="text"
          value={chordInput}
          onChange={e => setChordInput(e.target.value)}
        />
      </label>
      <Player chordInput={chordInput} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

// // You could also create additional stories with different initial values
// export const MinorChord = Template.bind({});
// MinorChord.args = {
//     chordInput: 'Amin'
// };
