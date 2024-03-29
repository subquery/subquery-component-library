// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Typography } from '.';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComponentProps } from 'react';

export default {
  title: 'General/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

const variants: Array<ComponentProps<typeof Typography>['variant']> = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'large',
  'text',
  'medium',
  'small',
  'overline',
];

const VariantTemplate: ComponentStory<React.FC> = (args) => (
  <div>
    <Typography {...args}>{'Typography with variants'}</Typography>
    {variants.map((v) => (
      <Typography variant={v} key={v}>
        {v}
      </Typography>
    ))}
  </div>
);

export const Default = VariantTemplate.bind({});

Default.args = {
  variant: 'default',
};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/sCAngiTf2mPOWPo9kcoEE7/SubQuery-Design-System?node-id=43%3A4',
  },
};

const types: Array<ComponentProps<typeof Typography>['type']> = [
  'default',
  'secondary',
  'success',
  'warning',
  'danger',
];

const TypeTemplate: ComponentStory<React.FC> = (args) => (
  <div>
    <Typography {...args}>{'Typography with types'}</Typography>
    {types.map((v) => (
      <Typography type={v} key={v}>
        {v}
      </Typography>
    ))}
  </div>
);

export const Types = TypeTemplate.bind({});

Types.args = {
  variant: 'default',
  type: 'default',
  weight: 500,
};
Types.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/sCAngiTf2mPOWPo9kcoEE7/SubQuery-Design-System?node-id=3%3A170',
  },
};
