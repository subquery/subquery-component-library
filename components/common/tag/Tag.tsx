// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Tag as AntTag, TagProps as AntTagProps, TagType as AntTagType } from 'antd';
import { Typography } from '../typography';
import styles from './Tag.module.css';
import clsx from 'clsx';

export interface TagProps extends AntTagProps, Partial<AntTagType> {
  className?: string;
  state?: 'error' | 'success' | 'info' | 'warning' | 'default';
}

export const Tag: React.FC<React.PropsWithChildren<TagProps>> = ({
  children,
  className,
  state = 'default',
  ...props
}) => {
  const sortedColor = state === 'info' ? 'processing' : state;
  return (
    <AntTag className={clsx(styles.tag, className)} color={sortedColor} {...props}>
      {children ?? <Typography>{state}</Typography>}
    </AntTag>
  );
};
