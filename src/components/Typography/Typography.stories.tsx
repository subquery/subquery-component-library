// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Typography from './Typography';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComponentProps } from 'react';

export default {
  title: 'Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

const variants: Array<ComponentProps<typeof Typography>['variant']> = [
  undefined,
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'large',
  'body',
  'medium',
  'small',
  'overline',
];

const Template: ComponentStory<React.FC> = () => (
  <div>
    {variants.map((v) => (
      <Typography variant={v} key={v}>
        {v}
      </Typography>
    ))}
  </div>
);

export const All = Template.bind({});

All.args = {};
