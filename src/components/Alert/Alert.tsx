// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import Typography from '../Typography';
import styles from './Alert.module.css';

type State = 'error' | 'success' | 'info' | 'warning';

type Props = {
  text: string;
  state: State;
  className?: string;
  onClose?: () => void;
};

const icons: Record<State, string> = {
  info: 'info',
  error: 'x',
  warning: 'exclamation',
  success: 'check',
};

const Alert: React.FC<Props> = ({ text, state, className, onClose }) => {
  return (
    <div className={[styles.container, styles[`container-${state}`], className].join(' ')}>
      <div className={styles.left}>
        <i
          className={[`bi-${icons[state]}-circle-fill`, styles.icon, styles[`icon-${state}`]].join(' ')}
          role="img"
          aria-label="alert icon"
        />
        <Typography variant="medium" className={styles.text}>
          {text}
        </Typography>
      </div>
      <div>
        {/* TODO add optional link */}
        {onClose && (
          <i className={[`bi-x`, styles.close].join(' ')} role="img" aria-label="close icon" onClick={onClose} />
        )}
      </div>
    </div>
  );
};

export default Alert;
