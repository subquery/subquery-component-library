// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Table, TableProps } from 'antd';

import clsx from 'clsx';
import { createBEM } from 'components/utilities/createBem';

import './Table.less';

export type SubqlTableProps = TableProps<Record<PropertyKey, any>>;

export const SubqlTable: React.FC<SubqlTableProps> = (props) => {
  const bem = createBEM('subql-table');
  const pageSize = React.useMemo(() => {
    if (props.pagination) {
      return props.pagination.pageSize || 10;
    }
    return 10;
  }, [props.pagination]);

  const hidePaginationCls = React.useMemo(() => {
    if ((props.dataSource?.length ?? 0) <= pageSize) {
      return bem('page', { hide: 'hide' });
    }
    return '';
  }, [pageSize, props.dataSource]);

  return <Table {...props} className={clsx(bem(), hidePaginationCls, props.className)}></Table>;
};
