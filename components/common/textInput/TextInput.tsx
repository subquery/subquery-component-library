// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import clsx from 'clsx';
import * as React from 'react';
import { OptionalProp } from '../../types';

import styles from './TextInput.module.css';
import { Typography } from '../typography';

type InputProps = React.HTMLProps<HTMLInputElement>;
type TextAreaProps = React.HTMLProps<HTMLTextAreaElement>;

type BaseProps = {
  input: InputProps;
  textarea: TextAreaProps;
};

type Props<T = BaseProps> = {
  label?: OptionalProp<string>;
  variant?: 'large' | 'medium';
  base?: keyof T;
  error?: OptionalProp<string>;
  containerClassName?: string;
} & T[keyof T];

const TextInput: React.FC<Props> = ({
  variant = 'large',
  base = 'input',
  label,
  error,
  containerClassName,
  ...rest
}) => {
  const className = clsx(
    styles.base,
    variant === 'large' ? styles.large : styles.medium,
    error ? styles.error : undefined,
    rest.className,
  );

  return (
    <div className={clsx(styles.container, containerClassName)}>
      {label && (
        <label htmlFor={rest.id}>
          <Typography className={styles.label}>{label}</Typography>
        </label>
      )}

      {base === 'input' ? (
        <input {...(rest as InputProps)} className={className} />
      ) : (
        <textarea {...(rest as TextAreaProps)} className={className} />
      )}
      {error && (
        <Typography variant="medium" className={styles.errorText}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default TextInput;
