// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Address } from '..';
import Dropdown from './Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});

Default.args = {
  items: [
    { key: '1', label: 'Item One' },
    { key: '2' },
    { key: '3', label: 'Item 3' },
    { key: '4', label: 'Four fore for 4' }, // Longer than the width when closed
  ],
  selected: 1,
};

export const ButtonStyles = Template.bind({});

ButtonStyles.args = {
  items: [
    { key: '1', label: 'Item One' },
    { key: '2' },
    { key: '3', label: 'Item 3' },
    { key: '4', label: 'Four fore for 4' }, // Longer than the width when closed
  ],
  type: 'primary',
  colorScheme: 'standard',
};

export const CustomComponent = Template.bind({});

CustomComponent.args = {
  items: [
    { key: '1', label: 'Item One' },
    { key: '2' },
    { key: '3', label: 'Item 3' },
    { key: '4', label: 'Four fore for 4' }, // Longer than the width when closed
  ],
  children: <Address address="0xFf64d3F6efE2317EE2807d223a0Bdc4c0c49dfDB" />,
  colorScheme: 'gradient',
};
