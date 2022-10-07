// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import Spinner from '../spinner';
import { Typography } from '../typography';
import styles from './Toast.module.css';

type State = 'error' | 'success' | 'info' | 'warning' | 'loading';

type Props = {
  text: string;
  state: State;
  className?: string;
};

const icons: Record<State, string> = {
  info: 'info',
  error: 'x',
  warning: 'exclamation',
  success: 'check',
  loading: '',
};

const Alert: React.FC<Props> = ({ text, state, className }) => {
  return (
    <div className={[styles.container, className].join(' ')}>
      {state === 'loading' ? (
        <Spinner size={16} />
      ) : (
        <i
          className={[`bi-${icons[state]}-circle-fill`, styles.icon, styles[`icon-${state}`]].join(' ')}
          role="img"
          aria-label="alert icon"
        />
      )}

      <Typography variant="medium" className={styles.text}>
        {text}
      </Typography>
    </div>
  );
};

export default Alert;
