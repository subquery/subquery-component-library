// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Modal as AntdModal, ModalProps as AntdModalProps, StepsProps, StepProps } from 'antd';
import { useBem } from 'components/utilities/useBem';
import clsx from 'clsx';

import './Modal.less';
import { attachPropertiesToComponent } from 'components/utilities/attachPropertiesToCompnent';
import { Typography } from '../typography';
import { Steps } from '../steps';

export interface ModalProps extends AntdModalProps {
  title?: React.ReactNode;
  /**
   * @deprecated The method should not be used
   */
  description?: string | React.ReactNode;
  submitText?: React.ReactNode;
  cancelText?: React.ReactNode;
  danger?: boolean;
  onSubmit?: () => void | Promise<void>;
  onCancel?: () => void;
  steps?: Array<StepProps>;
  stepsProps?: StepsProps;
  currentStep?: number;
}

export const innerModal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  title,
  description,
  onSubmit,
  cancelText,
  onCancel,
  children,
  danger,
  steps,
  stepsProps,
  currentStep,
  className,
  ...modalProps
}) => {
  const bem = useBem('subql-modal');
  const [loading, setLoading] = React.useState<boolean>(false);
  const sortedDescription = description ? (
    <div style={{ marginTop: 24 }}>
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
      onOk={handleSubmit}
      onCancel={onCancel}
      cancelButtonProps={{ shape: 'round', size: 'large' }}
      okButtonProps={{ shape: 'round', size: 'large', danger }}
      confirmLoading={loading}
      {...modalProps}
      className={clsx(bem(), className)}
    >
      <>
        {steps && <Steps steps={steps} current={currentStep} {...stepsProps} />}
        {sortedDescription}
        {children}
      </>
    </AntdModal>
  );
};

export const Modal = attachPropertiesToComponent(innerModal, {
  success: AntdModal.success,
  confirm: AntdModal.confirm,
  info: AntdModal.info,
  error: AntdModal.error,
  warning: AntdModal.warning,
});
