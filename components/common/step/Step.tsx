// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Steps as AntSteps, StepsProps as AntStepsProps, StepProps as AntStepProps } from 'antd';

export interface StepProps extends AntStepProps {
  title: string;
  className?: string;
  icon?: React.ReactNode;
}

export interface StepsProps extends AntStepsProps {
  className?: string;
}
export const Steps: React.FC<React.PropsWithChildren<StepsProps>> = ({ size, className, items, current, ...props }) => {
  return <AntSteps className={className} size={size} current={current} items={items} {...props}></AntSteps>;
};
