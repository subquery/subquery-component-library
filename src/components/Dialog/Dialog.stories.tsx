// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Dialog from './Dialog';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => (
  <div>
    <Dialog {...args} />
  </div>
);

export const Delete = Template.bind({});

Delete.args = {
  type: 'delete',
  title: 'Delete project',
  content: 'Some contents...',
  cancelText: 'Cancel',
  submitText: 'Delete',
};

export const Info = Template.bind({});

Info.args = {
  type: 'info',
  title: 'Delete project',
  content: 'Some contents...',
  cancelText: 'Cancel',
  submitText: 'Done',
};

export const ErrorDialog = Template.bind({});

ErrorDialog.args = {
  type: 'error',
  title: 'Something went wrong',
  content: 'Some contents...',
  cancelText: 'Cancel',
  submitText: 'Confirm',
};
