// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import clsx from 'clsx';
import { DropDownProps as AntdDropdownProps, Dropdown as AntdDropdown, Menu, Space } from 'antd';
import DownOutlined from '@ant-design/icons/DownOutlined';
import { ItemType, MenuClickEventHandler } from 'rc-menu/lib/interface';
import styles from './Dropdown.module.css';
import { Typography } from '../typography';
import { Context } from '../provider';

export interface DropdownProps extends Partial<AntdDropdownProps> {
  label?: string;
  menuitem: ItemType[];
  menuClassName?: string;
  onMenuItemClick?: MenuClickEventHandler;
  onLableClick?: () => void;
  LeftLabelIcon?: React.ReactElement;
  RightLabelIcon?: React.ReactElement;
  active?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  LeftLabelIcon,
  RightLabelIcon,
  menuitem,
  menuClassName,
  active,
  onMenuItemClick,
  onLableClick,
  ...props
}) => {
  const { theme } = React.useContext(Context);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const sortedLabel = (
    <Space className={clsx(styles.dropdownLabel, styles.pointer, (isOpen || active) && styles.isOnHover)}>
      {LeftLabelIcon}
      <Typography
        onClick={() => {
          onLableClick?.();
        }}
      >
        {label ?? 'Dropdown'}
      </Typography>
      <Typography>
        {LeftLabelIcon ? undefined : RightLabelIcon ? (
          RightLabelIcon
        ) : (
          <DownOutlined
            style={{
              fontSize: 12,
              color: theme === 'dark' ? '#fff' : 'var(--sq-gray600)',
            }}
          />
        )}
      </Typography>
    </Space>
  );

  const sortedMenu = (
    <Menu
      onClick={(item) => {
        onMenuItemClick && onMenuItemClick(item);
        setIsOpen(false);
      }}
      items={menuitem}
      className={clsx('menuStyle', menuClassName)}
    />
  );

  return (
    <AntdDropdown
      overlay={sortedMenu}
      onOpenChange={(openStatus) => {
        setIsOpen(openStatus);
      }}
      placement="bottomLeft"
      {...props}
    >
      {sortedLabel}
    </AntdDropdown>
  );
};

export interface MenuWithDescProps {
  title: string;
  description: string;
  className?: string;
  width?: string | number;
}
export const MenuWithDesc = ({ title, description, className, width }: MenuWithDescProps) => {
  return (
    <div className={clsx(styles.menuWithDesc, className)} style={{ width }}>
      <Typography weight={500} className={styles.title}>
        {title}
      </Typography>
      <Typography variant="small" type="secondary">
        {description}
      </Typography>
    </div>
  );
};
