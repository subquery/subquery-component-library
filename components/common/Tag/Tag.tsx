// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import Typography from '../typography';
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
