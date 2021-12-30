// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Button, Typography } from '..';
import styles from './Modal.module.css';

type Props = {
  title: string;
  submitText?: string;
  onSubmit?: () => void;
  cancelText?: string;
  onCancel?: () => void;
};

const Modal: React.FC<Props> = ({ title, submitText, onSubmit, cancelText, onCancel, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Typography variant="large">{title}</Typography>
        {onCancel && <i className={['bi-x', styles.close].join(' ')} role="img" aria-label="x" onClick={onCancel} />}
      </div>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}>
        {onCancel && cancelText && <Button type="secondary" label={cancelText} onClick={onCancel} />}
        {onSubmit && submitText && (
          <Button type="primary" label={submitText} onClick={onSubmit} className={styles.submit} />
        )}
      </div>
    </div>
  );
};

export default Modal;
