// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import Typography from '../Typography';
import styles from './Tag.module.css';

type Props = {
  text: string;
  state?: 'error' | 'success' | 'info' | 'warning' | 'default';
};

const Status: React.FC<Props> = ({ text, state = 'default' }) => {
  return (
    <div className={[styles.container, styles[`container-${state}`]].join(' ')}>
      <Typography variant="small" className={styles[`text-${state}`]}>
        {text}
      </Typography>
    </div>
  );
};

export default Status;
