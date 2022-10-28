// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Tag as AntTag, TagProps as AntTagProps, TagType as AntTagType } from 'antd';
import { Typography } from '../typography';
import styles from './Tabs.module.css';
import clsx from 'clsx';

export interface TabProps {
  label: string;
  active?: boolean;
  link?: string;
  onTabClick: (any: any) => void;
}

export const Tab: React.FC<React.PropsWithChildren<TabProps>> = ({ label, active, link, onTabClick }) => {
  // const sortedColor = state === 'info' ? 'processing' : state;
  // return (
  //   <AntTag className={clsx(styles.tag, className)} color={sortedColor} {...props}>
  //     {children ?? <Typography>{state}</Typography>}
  //   </AntTag>
  // );
  return <div>label</div>;
};
