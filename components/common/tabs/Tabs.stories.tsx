// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Tag, TagProps } from './Tabs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Typography } from '../typography';

export default {
  title: 'Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = ({ ...args }) => (
  <div>
    <Typography variant="text"> Tag</Typography>
    <Tag {...args}>{args.state ?? 'Tag'}</Tag>
    <div>
      <Typography variant="text"> All Preset Tags</Typography>
      {['info', 'success', 'warning', 'error'].map((status) => (
        <Tag key={status} state={status as TagProps['state']}>
          {status}
        </Tag>
      ))}
    </div>
  </div>
);

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/sCAngiTf2mPOWPo9kcoEE7/SubQuery-Design-System?node-id=360%3A5544',
  },
};

Default.args = {
  state: 'success',
};
