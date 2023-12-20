// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Tag as AntTag, TagProps as AntTagProps, TagType as AntTagType } from 'antd';
import { Typography } from '../typography';
import clsx from 'clsx';
import { useBem } from 'components/utilities/useBem';
import './Tag.less';

export interface TagProps extends AntTagProps, Partial<AntTagType> {
  className?: string;
  color?: 'error' | 'success' | 'info' | 'warning' | 'default';
}

export const Tag: React.FC<React.PropsWithChildren<TagProps>> = ({
  color = 'default',
  children,
  className,
  ...props
}) => {
  const bem = useBem('subql-tag');
  return (
    <AntTag {...props} className={clsx(bem({ [color]: color }), className)}>
      {children ?? <Typography>{color}</Typography>}
    </AntTag>
  );
};
