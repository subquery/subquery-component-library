// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd';
import { Button, Typography, Steps, StepsProps } from '..';
import styles from './Modal.module.css';

export interface ModalProps extends AntdModalProps {
  title?: string;
  description?: string | React.ReactNode;
  submitText?: string;
  cancelText?: string;
  danger?: boolean;
  onSubmit?: () => void | Promise<void>;
  onCancel?: () => void;
  steps?: StepsProps;
  onStepChange: (step: number) => void;
  currStep?: number;
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  title,
  description,
  submitText,
  onSubmit,
  cancelText,
  onCancel,
  children,
  danger,
  steps,
  currStep,
  ...modalProps
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const sortedDescription = description ? (
    <div className={styles.description}>
      {typeof description === 'string' ? <Typography>{description}</Typography> : description}
    </div>
  ) : undefined;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await onSubmit?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AntdModal
      title={
        <Typography variant={'large'} weight={600}>
          {title}
        </Typography>
      }
      cancelText={cancelText}
      okText={submitText}
      onOk={handleSubmit}
      onCancel={onCancel}
      cancelButtonProps={{ shape: 'round' }}
      okButtonProps={{ shape: 'round', danger }}
      confirmLoading={loading}
      {...modalProps}
      className={'modalStyle'}
    >
      <>
        {steps && <Steps {...steps} current={currStep} />}
        {sortedDescription}
        {children}
      </>
    </AntdModal>
  );
};
