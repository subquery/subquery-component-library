// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import clsx from 'clsx';
import { DropDownProps as AntdDropdownProps, Dropdown as AntdDropdown, Typography, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { ItemType, MenuClickEventHandler } from 'rc-menu/lib/interface';
import styles from './Dropdown.module.css';

export interface DropdownProps extends AntdDropdownProps {
  label?: string;
  menu: ItemType[];
  onMenuItemClick?: MenuClickEventHandler;
  LeftLabelIcon?: React.ReactElement;
  RightLabelIcon?: React.ReactElement;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  LeftLabelIcon,
  RightLabelIcon,
  menu,
  onMenuItemClick,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const sortedLabel = (
    <Space className={clsx(styles.pointer, isOpen && styles.isOnHover)}>
      {LeftLabelIcon}
      <Typography className={styles.colorInherit}>{label ?? 'Dropdown'}</Typography>
      {LeftLabelIcon ? undefined : RightLabelIcon ? RightLabelIcon : <DownOutlined />}
    </Space>
  );

  const sortedMenu = (
    <Menu
      onClick={(item) => {
        onMenuItemClick && onMenuItemClick(item);
        setIsOpen(false);
      }}
      items={menu}
      className={'menuStyle'}
    />
  );

  return (
    <AntdDropdown
      {...props}
      overlay={sortedMenu}
      onOpenChange={(openStatus) => {
        setIsOpen(openStatus);
      }}
    >
      {sortedLabel}
    </AntdDropdown>
  );
};
