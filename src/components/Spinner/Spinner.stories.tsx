// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Spinner from './Spinner';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Spinner',
  component: Spinner,
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args) => (
  <div>
    <Spinner {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {};

export const Size = Template.bind({});

Size.args = {
  size: 30,
};

export const Color = Template.bind({});

Color.args = {
  color: '#ff4581',
};
