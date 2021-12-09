// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './TextInput';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});

Default.args = {};

export const WithLabel = Template.bind({});

WithLabel.args = {
  label: 'Input Label',
};

export const Placeholder = Template.bind({});

Placeholder.args = {
  placeholder: 'Enter something here',
};

export const Value = Template.bind({});

Value.args = {
  value: 'Hello World',
};

export const Medium = Template.bind({});

Medium.args = {
  variant: 'medium',
  value: 'Hello World',
};

export const Disabled = Template.bind({});

Disabled.args = {
  disabled: true,
  placeholder: 'Something something',
};

export const TextArea = Template.bind({});

TextArea.args = {
  base: 'textarea',
  value: 'Something a little longer than a normal text input value',
};

export const Error = Template.bind({});

Error.args = {
  value: 'Something',
  error: "Please input passenger's name or delete this field.",
};
