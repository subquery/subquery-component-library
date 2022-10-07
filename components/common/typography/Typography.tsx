// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import clsx from 'clsx';
import styles from './Typography.module.css';

type Props = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'large' | 'text' | 'medium' | 'small' | 'overline';
  type?: 'default' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
} & React.HTMLProps<HTMLParagraphElement>;

export const Typography: React.FC<Props> = ({
  children,
  variant = 'text',
  type = 'default',
  className,
  ...htmlProps
}) => {
  return (
    <p {...htmlProps} className={clsx(styles.t, styles[variant], styles[type], className)}>
      {children}
    </p>
  );
};
