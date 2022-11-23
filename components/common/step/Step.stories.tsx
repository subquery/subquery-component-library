// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Steps } from './Step';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Typography } from '../typography';

export default {
  title: 'General/Step',
  component: Steps,
} as ComponentMeta<typeof Steps>;

const Template: ComponentStory<typeof Steps> = ({ current, titleList, ...args }) => (
  <div>
    <Typography variant="text"> Small Step</Typography>
    <Steps titleList={titleList} current={current} {...args}></Steps>
    <div>
      <Typography variant="text"> Default Step</Typography>
      <Steps titleList={titleList} current={current}></Steps>
    </div>
  </div>
);

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/sCAngiTf2mPOWPo9kcoEE7/SubQuery-Design-System?node-id=487%3A5622&t=GMEQqEgGio0yU8qw-0',
  },
};

Default.args = {
  size: 'small',
  titleList: ['Finished', 'In Progress', 'Waiting'],
  current: 1,
};
