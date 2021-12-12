// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Typography } from '..';
import Modal from './Modal';

export default {
  title: 'Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <div>
    <Modal {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  title: "I'm a modal",
  submitText: 'Submit',
  onSubmit: () => {
    /* nothing */
  },
  children: (
    <div>
      <Typography>Some body content as placeholder</Typography>
    </div>
  ),
};
