// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ComponentStory, ComponentMeta } from '@storybook/react';
import Input from './TextInput';

export default {
  title: 'General/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args: any) => <Input {...args} />;

export const Default = Template.bind({});

Default.args = {
  placeholder: 'Placeholder',
  label: 'Input Label',
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

export const Multiple = () => (
  <>
    <Input label="Input 1" />

    <Input label="Input 2" />
  </>
);
