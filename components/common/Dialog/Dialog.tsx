// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import clsx from 'clsx';
import * as React from 'react';
import { Button, Typography } from '..';
import styles from './Dialog.module.css';

type Props = {
  title: string;
  content: string;
  type: 'delete' | 'info' | 'error';
  cancelText: string;
  onCancel: () => void;
  submitText: string;
  onSubmit: () => void;
};

const icons = {
  delete: 'exclamation',
  info: 'info',
  error: 'x',
};

const Dialog: React.FC<Props> = ({ title, content, type, onCancel, cancelText, onSubmit, submitText }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <i
          className={clsx(`bi-${icons[type]}-circle`, styles.icon, styles[`icon-${type}`])}
          role="img"
          aria-label="alert icon"
        />
        <div>
          <Typography>{title}</Typography>
          <Typography variant="medium">{content}</Typography>
        </div>
      </div>
      <div className={styles.footer}>
        <Button
          size="medium"
          type="secondary"
          colorScheme="standard" /* TODO use neutral color */
          label={cancelText}
          onClick={onCancel}
          className={styles.cancel}
        />

        <Button
          size="medium"
          type="primary"
          colorScheme="standard"
          label={submitText}
          onClick={onSubmit}
          className={styles[`submit-${type}`]}
        />
      </div>
    </div>
  );
};

export default Dialog;
