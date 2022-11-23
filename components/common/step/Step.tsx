// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Steps as AntSteps, StepsProps as AntStepsProps } from 'antd';
import clsx from 'clsx';
//import styles from '../tag/Tag.module.css';

export interface stepsProps extends AntStepsProps {
  titleList?: string[];
  className?: string;
}
const { Step } = AntSteps;
export const Steps: React.FC<React.PropsWithChildren<stepsProps>> = ({
  size,
  className,
  titleList,
  current,
  ...props
}) => {
  return (
    <AntSteps className={className} size={size} current={current} {...props}>
      {titleList?.map((t) => (
        <Step title={t} key={t}></Step>
      ))}
    </AntSteps>
  );
};
