// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Progress, ProgressProps } from 'antd';
import clsx from 'clsx';

export interface ProgressBarPros extends ProgressProps {
  progress: number;
  className?: string;
  grayTheme?: boolean;
}

export const ProgressBar: React.FC<ProgressBarPros> = ({ grayTheme, progress, className, ...props }) => {
  const sortedProgress = progress <= 1 ? progress * 100 : progress;
  const trailColor = grayTheme ? '#DFE3E8' : undefined;
  const strokeColor = grayTheme ? 'rgba(67, 136, 221, 0.4)' : undefined;

  return (
    <Progress
      percent={sortedProgress}
      status="active"
      trailColor={trailColor}
      strokeColor={strokeColor}
      className={clsx(grayTheme && 'grayProgressStyle', className)}
      {...props}
    />
  );
};
