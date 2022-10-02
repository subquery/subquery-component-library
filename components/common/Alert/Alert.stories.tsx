// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Alert from './Alert';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Alert',
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => (
  <div>
    <Alert {...args} />
  </div>
);

export const ErrorTag = Template.bind({});

ErrorTag.args = {
  text: 'Error',
  state: 'error',
};

export const Success = Template.bind({});

Success.args = {
  text: 'Success',
  state: 'success',
};

export const Info = Template.bind({});

Info.args = {
  text: 'Info',
  state: 'info',
};

export const Warning = Template.bind({});

Warning.args = {
  text: 'Warning',
  state: 'warning',
};
