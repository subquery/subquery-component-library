// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import clsx from 'clsx';
import styles from './Typography.module.css';
import { Tooltip } from 'antd';

type Props = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'large' | 'text' | 'medium' | 'small' | 'overline';
  type?: 'default' | 'secondary' | 'success' | 'warning' | 'danger';
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
  return (
    <Tooltip title={tooltip} placement="topLeft">
      <p
        {...htmlProps}
        className={clsx(
          styles.t,
          styles[variant],
          styles[type],
          styles[`w${weight}`],
          tooltip && styles.tooltip,
          tooltipIcon && styles.tooltipIcon,
          className,
        )}
      >
        {children}
        &nbsp;
        {tooltipIcon}
      </p>
    </Tooltip>
  );
};
