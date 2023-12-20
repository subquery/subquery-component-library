// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Steps as AntSteps, StepsProps as AntStepsProps, StepProps } from 'antd';
import clsx from 'clsx';
import { useBem } from 'components/utilities/useBem';
import './Steps.less';

export interface StepsProps extends AntStepsProps {
  steps: Array<StepProps>;
}
export const Steps: React.FC<React.PropsWithChildren<StepsProps>> = ({ steps, ...props }) => {
  const bem = useBem('subql-steps');
  return (
    <AntSteps size="small" {...props} className={clsx(bem(), props.className)}>
      {steps?.map((stepProps, idx) => (
        <AntSteps.Step {...stepProps} key={idx}></AntSteps.Step>
      ))}
    </AntSteps>
  );
};
