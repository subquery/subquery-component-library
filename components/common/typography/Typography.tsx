// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import styles from './Typography.module.css';

type Props = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'large' | 'body' | 'medium' | 'small' | 'overline';
  className?: string;
} & React.HTMLProps<HTMLParagraphElement>;

const Typography: React.FC<Props> = ({ children, variant = 'body', className, ...rest }) => {
  return (
    <p {...rest} className={[styles.t, styles[variant], className].join(' ')}>
      {children}
    </p>
  );
};

export default Typography;
