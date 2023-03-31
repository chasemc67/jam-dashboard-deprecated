import React from 'react';
import { Meta, Story } from '@storybook/react';
import FretBoard, { FretBoardProps } from './FretBoard';

export default {
  title: 'Components/FretBoard',
  component: FretBoard,
} as Meta;

const Template: Story<FretBoardProps> = (args) => <FretBoard {...args} />;

export const Default = Template.bind({});
Default.args = {
  rootNotes: ['E', 'A', 'D', 'G', 'B', 'E'],
  highlightedNotes: [
    { note: 'A', color: 'red' },
    { note: 'C', color: 'blue' },
    { note: 'D', color: 'green' },
  ],
  numberOfFrets: 12,
  startingFret: 0,
  showTextNotes: true,
};