import React,{useState} from 'react';
import { Meta, Story } from '@storybook/react';
import { TheTable,TheTableProps  } from '../src';
import DATA from '../vars/MOCK_TABLE.json'
import {header} from '../vars/vars'


const meta: Meta = {
  title: 'Welcome',
  component: TheTable,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<TheTableProps> = args => <TheTable {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {rows:DATA,header,update:true};
