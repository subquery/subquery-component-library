// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Steps as AntSteps, StepsProps as AntStepsProps, StepProps } from 'antd';

export interface StepsProps extends AntStepsProps {
  steps: Array<StepProps>;
}
export const Steps: React.FC<React.PropsWithChildren<StepsProps>> = ({ steps, ...props }) => {
  return (
    <AntSteps size="small" {...props}>
      {steps?.map((stepProps, idx) => (
        <AntSteps.Step {...stepProps} key={idx}></AntSteps.Step>
      ))}
    </AntSteps>
  );
};
