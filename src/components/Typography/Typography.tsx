// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import styles from './Typography.module.css';

type Props = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'large' | 'body' | 'medium' | 'small' | 'overline';
  className?: string;
};

const Typography: React.FC<Props> = ({ children, variant = 'body', className }) => {
  return <p className={[styles.t, styles[variant], className].join(' ')}>{children}</p>;
};

export default Typography;
