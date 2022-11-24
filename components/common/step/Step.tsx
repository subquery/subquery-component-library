// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Steps as AntSteps, StepsProps as AntStepsProps } from 'antd';

export interface StepsProps extends AntStepsProps {
  items?: string[];
  className?: string;
}
export const Steps: React.FC<React.PropsWithChildren<StepsProps>> = ({ size, className, items, current, ...props }) => {
  return (
    <AntSteps className={className} size={size} current={current} {...props}>
      {items?.map((t) => (
        <AntSteps.Step title={t} key={t}></AntSteps.Step>
      ))}
    </AntSteps>
  );
};
