// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { FC } from 'react';
import { Tabs, TabsProps } from 'antd';
import clsx from 'clsx';

import './subqlTabs.less';
import { useBem } from 'components/utilities/useBem';

export type SubqlTabsType = TabsProps;

export const SubqlTabs: FC<SubqlTabsType> = ({ className, ...props }) => {
  const bem = useBem('subql-tabs');
  return <Tabs {...props} className={clsx(bem(), className)}></Tabs>;
};
