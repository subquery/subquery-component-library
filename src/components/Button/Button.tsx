// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';

type Props = {
  type?: 'primary' | 'secondary' | 'link';
  size?: 'large' | 'medium' | 'small';
  colorScheme?: 'gradient' | 'standard' /* | 'neutral'*/; // TODO add neutral styles
  label?: string;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
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
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {leftItem}
      <span>{label}</span>
      {rightItem}
    </a>
  );
};

export default Button;
