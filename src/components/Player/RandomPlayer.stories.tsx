import React from 'react';
import { Meta, Story } from '@storybook/react';
import RandomPlayer from './RandomPlayer';

export default {
  title: 'Components/RandomPlayer',
  component: RandomPlayer,
} as Meta;

const Template: Story = () => <RandomPlayer />;

export const Default = Template.bind({});
