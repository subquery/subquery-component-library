// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import ProgressBar from './ProgressBar';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComponentProps } from 'react';

export default {
  title: 'ProgressBar',
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const progress: Array<ComponentProps<typeof ProgressBar>['progress']> = [0, 0.1, 0.2, 1 / 3, 0.5, 0.75, 1];

const Template: ComponentStory<React.FC> = () => (
  <div>
    {progress.map((p) => (
      <ProgressBar key={p} progress={p} />
    ))}
  </div>
);

export const All = Template.bind({});

All.args = {};
