// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { Typography } from '../typography';
import styles from './Tabs.module.css';

export interface TabProps {
  label: string;
  active?: boolean;
  link?: string;
  tooltip?: string;
  icon?: React.ReactElement;
  className?: string;
  onTabClick?: (any: any) => void;
}

export const Tab: React.FC<React.PropsWithChildren<TabProps>> = ({
  label,
  active,
  link,
  tooltip,
  icon,
  className,
  onTabClick,
  children,
}) => {
  const Content = () => (
    <>
      {icon && <div className={styles.icon}>{icon}</div>}
      <Typography tooltip={tooltip} className={styles.tabText}>
        {label || children}
      </Typography>
    </>
  );

  if (link) {
    return (
      <NavLink
        to={link}
        className={clsx(styles.pointer, styles.tab, className, active && styles.active)}
        replace
        onClick={onTabClick}
      >
        <Content />
      </NavLink>
    );
  }

  return (
    <div className={clsx(styles.pointer, styles.tab, className, active && styles.active)} onClick={onTabClick}>
      <Content />
    </div>
  );
};

export interface TabsPros {
  tabs: Array<TabProps>;
  onTabClick?: (any: any) => void;
  activeTabKey?: number;
  activeTab?: string;
}

export const Tabs: React.FC<React.PropsWithChildren<TabsPros>> = ({ tabs, onTabClick, activeTabKey, activeTab }) => {
  const [activeKey, setActiveKey] = React.useState<number>(activeTabKey || 0);

  return (
    <div className={styles.tabs}>
      {tabs.map((tab, idx) => (
        <Tab
          key={tab.label}
          className={styles.tabsItem}
          active={tab.active || activeTabKey === idx || activeTab === tab.label || activeKey === idx}
          onTabClick={() => {
            setActiveKey(idx);
            onTabClick && onTabClick(idx);
            tab.onTabClick && tab.onTabClick(idx);
          }}
          {...tab}
        />
      ))}
    </div>
  );
};
