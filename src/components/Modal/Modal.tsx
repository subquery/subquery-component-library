// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Button, Typography } from '..';
import styles from './Modal.module.css';

type Props = {
  title: string;
  submitText?: string;
  onSubmit?: () => void | Promise<void>;
  cancelText?: string;
  onCancel?: () => void;
};

const Modal: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  submitText,
  onSubmit,
  cancelText,
  onCancel,
  children,
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit?.();
    } finally {
      setLoading(false);
    }
  };

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
          <Button
            type="primary"
            label={submitText}
            onClick={handleSubmit}
            className={styles.submit}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default Modal;
