// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ProgressBar } from './ProgressBar';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ComponentProps } from 'react';
import { Typography } from '../typography';

export default {
  title: 'General/ProgressBar',
  component: ProgressBar,
} as ComponentMeta<typeof ProgressBar>;

const progresses: Array<ComponentProps<typeof ProgressBar>['progress']> = [0, 0.1, 0.2, 1 / 3, 0.5, 0.75, 1];

const Template: ComponentStory<typeof ProgressBar> = ({ progress, ...props }) => (
  <div>
    {progresses.map((p) => (
      <ProgressBar key={p} progress={p} />
    ))}

    <Typography>Default ProgressBar</Typography>
    <ProgressBar progress={progress} />

    <Typography>ProgressBar with status</Typography>
    <ProgressBar progress={progress} {...props} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  progress: 20,
  status: 'exception',
};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/sCAngiTf2mPOWPo9kcoEE7/SubQuery-Design-System?node-id=362%3A5557',
  },
};

const GrayTemplate: ComponentStory<typeof ProgressBar> = ({ ...props }) => (
  <div>
    <Typography>ProgressBar with grayTheme</Typography>
    <ProgressBar {...props} />
  </div>
);

export const GrayTheme = GrayTemplate.bind({});

GrayTheme.args = {
  progress: 50,
  grayTheme: true,
};

GrayTheme.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/sCAngiTf2mPOWPo9kcoEE7/SubQuery-Design-System?node-id=1853%3A9566',
  },
};
