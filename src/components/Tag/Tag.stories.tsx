// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Tag from './Tag';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => (
  <div>
    <Tag {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  text: 'Default',
};

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
