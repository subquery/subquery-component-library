// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Typography } from '..';
import styles from './ProgressBar.module.css';

type Props = {
  progress: number;
  className?: string;
};

const ProgressBar: React.FC<Props> = ({ progress, className }) => {
  return (
    <div className={[styles.progressContainer, className].join(' ')}>
      <div className={[styles.progress, styles.progressBack].join(' ')}>
        <div className={[styles.progress, styles.progressFront].join(' ')} style={{ width: `${progress * 100}%` }} />
      </div>
      <Typography variant="medium" className={styles.percent}>
        {`${(progress * 100).toFixed(2)}%`}
      </Typography>
    </div>
  );
};

export default ProgressBar;
