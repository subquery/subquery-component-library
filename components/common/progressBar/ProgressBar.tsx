// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Progress, ProgressProps } from 'antd';
import clsx from 'clsx';
import { useBem } from 'components/utilities/useBem';
import './ProgressBar.less';

export type ProgressBarPros = ProgressProps;

export const SubqlProgress: React.FC<ProgressBarPros> = ({ ...props }) => {
  const bem = useBem('subql-progress');
  return <Progress {...props} className={clsx(bem(), props.className)}></Progress>;
};
