// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';
import Spinner from '../Spinner';

type Props = {
  type?: 'primary' | 'secondary' | 'link';
  size?: 'large' | 'medium' | 'small';
  colorScheme?: 'gradient' | 'standard' | 'neutral';
  label?: string;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Button: React.VFC<Props> = ({
  type = 'primary',
  size = 'large',
  colorScheme = 'gradient',
  className,
  leftItem,
  rightItem,
  label,
  onClick,
  disabled,
  loading,
  ...rest
}) => {
  return (
    <a
      className={clsx(
        styles.button,
        styles[size],
        disabled ? [styles.disabled, styles[`disabled-${type}`]] : [styles[type], styles[`${type}-${colorScheme}`]],
        !leftItem && !rightItem && type === 'link' && [styles['link-text'], styles[`link-text-${colorScheme}`]],
        type === 'link' && styles[`link-${size}`],
        className,
      )}
      onClick={disabled || loading ? undefined : onClick}
      {...rest}
    >
      {leftItem ?? (loading && <Spinner color={type === 'primary' ? 'white' : '#4388dd'} size={12} />)}
      {label && <span>{label}</span>}
      {rightItem}
    </a>
  );
};

export default Button;
