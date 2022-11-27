// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Steps } from './Steps';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Typography } from '../typography';
import { Space } from 'antd';

export default {
  title: 'General/Step',
  component: Steps,
} as ComponentMeta<typeof Steps>;

const Template: ComponentStory<typeof Steps> = ({ steps, ...args }) => (
  <>
    <div>
      <Typography variant="text"> Small Step</Typography>
      <Steps steps={steps} {...args}></Steps>
    </div>
    <Space />
    <div>
      <Typography variant="text"> Default Step</Typography>
      <Steps steps={steps} {...args} size="default"></Steps>
    </div>
  </>
);

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/sCAngiTf2mPOWPo9kcoEE7/SubQuery-Design-System?node-id=487%3A5622&t=GMEQqEgGio0yU8qw-0',
  },
};

Default.args = {
  steps: [
    { title: 'Purchase', description: 'This is purchase step' },
    { title: 'In Progress', description: 'This is in progress step' },
    { title: 'Finished', description: 'This is finished step' },
  ],
  current: 1,
};
