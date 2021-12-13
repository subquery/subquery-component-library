// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import styles from './Table.module.css';

type TableProps = {
  className?: string;
};

export const Table: React.FC<TableProps> = ({ children, className }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={[styles.table, className].join(' ')}>{children}</table>
    </div>
  );
};

type TableHeadProps = {
  className?: string;
} & React.HTMLProps<HTMLTableSectionElement>;

export const TableHead: React.FC<TableHeadProps> = ({ className, children, ...rest }) => {
  return (
    <thead {...rest} className={[styles.head, className].join(' ')}>
      {children}
    </thead>
  );
};

type TableBodyProps = {
  className?: string;
} & React.HTMLProps<HTMLTableSectionElement>;

export const TableBody: React.FC<TableBodyProps> = ({ children, className, ...rest }) => {
  return (
    <tbody {...rest} className={[styles.body, className].join(' ')}>
      {children}
    </tbody>
  );
};

type TableRowProps = {
  className?: string;
} & React.HTMLProps<HTMLTableRowElement>;

export const TableRow: React.FC<TableRowProps> = ({ children, className, ...rest }) => {
  return (
    <tr {...rest} className={[styles.row, className].join(' ')}>
      {children}
    </tr>
  );
};

type TableCellProps = {
  className?: string;
} & React.HTMLProps<HTMLTableCellElement>;

export const TableCell: React.FC<TableCellProps> = ({ children, className, ...rest }) => {
  return (
    <th {...rest} className={[styles.cell, className].join(' ')}>
      {children}
    </th>
  );
};

export default Table;
