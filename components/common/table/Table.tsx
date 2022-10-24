// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Pagination, Table as AntdTable, PaginationProps, TableProps } from 'antd';
import clsx from 'clsx';

interface AntDTableProps {
  customPagination?: boolean;
  paginationProps?: PaginationProps;
  tableProps: any; // TODO: TableProps version issue
}

export const Table: React.FC<AntDTableProps> = ({ customPagination = false, paginationProps, tableProps }) => {
  if (!customPagination) {
    return <AntdTable className={'tableStyle'} {...paginationProps} {...tableProps} />;
  }

  return (
    <>
      <AntdTable
        pagination={false} // offset function get partial data but antD fill from page 1
        className={'tableStyle'}
        {...tableProps}
      />
      <Pagination
        className={clsx('flex-end', 'verticalMargin')}
        defaultCurrent={1}
        showSizeChanger={false}
        pageSize={10}
        {...paginationProps}
      />
    </>
  );
};
