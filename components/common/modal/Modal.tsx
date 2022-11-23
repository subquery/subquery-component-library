// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd';
import { Button, Typography, Steps, StepsProps } from '..';
import styles from './Modal.module.css';

export interface ModalProps extends AntdModalProps {
  title?: string;
  description?: string[] | React.ReactNode[];
  submitText?: string;
  cancelText?: string;
  danger?: boolean;
  onSubmit?: () => void | Promise<void>;
  onCancel?: () => void;
  step?: StepsProps;
  onStepChange?: (step: number) => void;
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
  step,
  //onStepChange,
  ...modalProps
}) => {
  const [current, setCurrent] = React.useState<number>(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const finished = async () => {
    try {
      await onCancel?.();
    } finally {
      setCurrent(0);
    }
  };

  const [loading, setLoading] = React.useState<boolean>(false);
  const sortedDescription = description ? (
    <div className={styles.description}>
      {Array.isArray(description) ? <Typography>{description[current]}</Typography> : description}
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
      onOk={step ? next : handleSubmit}
      onCancel={step ? finished : onCancel}
      cancelButtonProps={{ shape: 'round' }}
      okButtonProps={{ shape: 'round', danger }}
      confirmLoading={loading}
      {...modalProps}
      className={'modalStyle'}
    >
      <>
        {step ? <Steps current={current} {...step} /> : <div />}
        {sortedDescription}
        {children}
      </>
    </AntdModal>
  );
};
