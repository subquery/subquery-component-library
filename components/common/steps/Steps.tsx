// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Steps as AntSteps, StepsProps as AntStepsProps, StepProps } from 'antd';
import styles from './Steps.module.css';
import clsx from 'clsx';

export interface StepsProps extends AntStepsProps {
  steps: Array<StepProps>;
}
export const Steps: React.FC<React.PropsWithChildren<StepsProps>> = ({ steps, ...props }) => {
  return (
    <AntSteps size="small" {...props} className={clsx(styles.steps, props.className)}>
      {steps?.map((stepProps, idx) => (
        <AntSteps.Step {...stepProps} key={idx}></AntSteps.Step>
      ))}
    </AntSteps>
  );
};
