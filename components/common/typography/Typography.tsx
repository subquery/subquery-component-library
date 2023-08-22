// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import clsx from 'clsx';
import styles from './Typography.module.css';
import { Space, Tooltip } from 'antd';
import { createBEM } from 'components/utilities/createBem';

type Props = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'large' | 'text' | 'medium' | 'small' | 'overline';
  type?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  tooltip?: string;
  className?: string;
  tooltipIcon?: React.ReactNode;
} & React.HTMLProps<HTMLParagraphElement>;

export const Typography: React.FC<Props> = ({
  children,
  variant = 'text',
  type = 'default',
  weight = 400,
  tooltip,
  tooltipIcon,
  className,
  ...htmlProps
}) => {
  const bem = createBEM('subql-typography');
  const inner = () => (
    <p {...htmlProps} className={clsx(bem(), styles.t, styles[variant], styles[type], styles[`w${weight}`], className)}>
      {children}
    </p>
  );
  if (!tooltip) {
    return <Space>{inner()}</Space>;
  }
  return (
    <Tooltip title={tooltip} placement="topLeft" className={tooltip && styles.tooltip}>
      <Space>
        {inner()}

        {tooltipIcon}
      </Space>
    </Tooltip>
  );
};
