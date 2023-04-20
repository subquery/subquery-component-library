// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import clsx from 'clsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { Space, Divider } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import styles from './Header.module.css';
import { Button, Dropdown, MenuWithDesc, Typography } from '../../common';
import logo from '../../../assets/logo.svg';
import appIcon from '../../../assets/appIcon.svg';
import { DownOutlined, UpOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';

const mobileMenuItems = (dropdownLinks: any, appNavigation: any) => {
  const [openMenu1, setOpenMenu1] = React.useState(false);
  const clickMenuBtn1 = () => {
    setOpenMenu1(!openMenu1);
  };

  const [openMenu2, setOpenMenu2] = React.useState(false);
  const clickMenuBtn2 = () => {
    setOpenMenu2(!openMenu2);
  };

  const menus = appNavigation.map((item: any) => {
    if (item.link) {
      return (
        <div className={styles.mMenuItem} key={item.label}>
          <div className={clsx(styles.mMenuTitle, styles.mLine)}>
            <a href={item.link ?? '/'}>{item.label}</a>
          </div>
        </div>
      );
    } else if (item.dropdown) {
      return (
        <div className={styles.mMenuItem} key={item.label}>
          <div className={clsx(styles.mMenuTitle, styles.mLine)} onClick={clickMenuBtn2}>
            <div className={styles.mLeftMenu}>
              {item.label}
              <DownOutlined style={{ display: openMenu2 ? 'none' : '' }} />
              <UpOutlined style={{ display: openMenu2 ? '' : 'none' }} />
            </div>
          </div>
          <div className={styles.mSubMenus} style={{ display: openMenu2 ? '' : 'none' }}>
            {item.dropdown.map((dropdownItem: any) => {
              return (
                <div className={styles.mMenuItem} key={dropdownItem.label}>
                  <div className={styles.mMenuTitle}>
                    <div className={styles.mLeftMenu}>
                      <a href={dropdownItem.link ?? '/'}>{dropdownItem.label}</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  });

  menus.unshift(
    <div className={styles.mMenuItem} key={dropdownLinks.label}>
      <div className={clsx(styles.mMenuTitle, styles.mLine)} onClick={clickMenuBtn1}>
        <div className={styles.mLeftMenu} style={{ color: 'var(--sq-primary-blue)' }}>
          <img src={appIcon} alt="SubQuery Apps" className={styles.mMenusIcon} /> {dropdownLinks.label}
        </div>
      </div>
      <div className={styles.mSubMenus} style={{ display: openMenu1 ? '' : 'none' }}>
        {dropdownLinks.links.map((dropdownItem: any) => {
          return (
            <div className={styles.mMenuItem} key={dropdownItem.label}>
              <div className={styles.mMenuTitle}>
                <div className={styles.mLeftMenu}>
                  <a href={dropdownItem.link ?? '/'}>{dropdownItem.label}</a>
                </div>
              </div>
              <div className={styles.mDescr}>{dropdownItem.description}</div>
            </div>
          );
        })}
      </div>
    </div>,
  );
  return menus;
};

export interface AppLink {
  label: string;
  link: string;
}

export interface DetailedLink {
  label: string;
  description: string;
  link: string;
}

export interface DropdownLink {
  label: string;
  links: DetailedLink[];
}

export interface AppNavigation {
  label: string;
  link?: string;
  dropdown?: AppLink[];
}

const isExternalLink = (to: string) => to.startsWith('https') || to.startsWith('http');

const renderLink = (to: string, label: string) => {
  if (!isExternalLink(to)) {
    return (
      <Typography>
        <NavLink to={to} className={(isActive) => clsx(styles.navLink, isActive && styles.navLinkCurrent)}>
          {label}
        </NavLink>
      </Typography>
    );
  }

  return (
    <Button
      href={to}
      target="_blank"
      className={styles.navLink}
      rel="noreferrer"
      type="link"
      label={label}
      colorScheme="neutral"
    />
  );
};

export interface LeftHeaderProps {
  leftElement?: React.ReactNode;
  dropdownLinks?: DropdownLink;
  showDivider?: boolean;
}
const LeftHeader = ({ leftElement, dropdownLinks, showDivider }: LeftHeaderProps) => {
  const sortedDropdownLinks = !leftElement && dropdownLinks && (
    <div className={clsx(styles.leftElement, styles.headerHeight)} id="leftHeader">
      <Dropdown
        label={dropdownLinks.label}
        LeftLabelIcon={<img src={appIcon} alt="SubQuery Apps" />}
        menuitem={dropdownLinks.links.map((label, key) => ({
          key,
          label: <MenuWithDesc title={label.label} description={label.description} className={styles.dropMenu} />,
        }))}
        active
        menuClassName={styles.menuOverlay}
        onMenuItemClick={({ key }) => {
          window.open(dropdownLinks.links[parseInt(key)]?.link ?? '/', '_blank');
        }}
        getPopupContainer={() => document.getElementById('leftHeader') as HTMLElement}
      />
    </div>
  );

  return (
    <Space>
      <>{leftElement}</>
      <>{sortedDropdownLinks}</>
      {showDivider && <Divider type="vertical" />}
    </Space>
  );
};

export interface MiddleHeaderProps {
  middleElement?: React.ReactNode;
  appNavigation?: AppNavigation[];
}
const MiddleHeader = ({ middleElement, appNavigation }: MiddleHeaderProps) => {
  const navigate = useNavigate();

  const sortedAppNavigation = !middleElement && appNavigation && (
    <Space className={clsx(styles.flexCenter, styles.headerHeight)}>
      {appNavigation.map((nav) => {
        if (nav.dropdown) {
          const dropdownMenu = nav.dropdown.map((menu) => ({ key: menu.link, label: menu.label }));
          return (
            <div key={nav.link} className={clsx(styles.appDropdown, styles.headerHeight)}>
              <Dropdown
                menuitem={dropdownMenu}
                label={nav.label}
                onMenuItemClick={({ key }) => {
                  if (isExternalLink(key)) {
                    window.open(key, '_blank');
                  } else {
                    navigate(key);
                  }
                }}
              />
            </div>
          );
        }
        return <div key={nav.link}>{renderLink(nav.link ?? '/', nav.label)}</div>;
      })}
    </Space>
  );

  return (
    <>
      <>{middleElement}</>
      <>{sortedAppNavigation}</>
    </>
  );
};

export interface HeaderProps {
  logoLink?: string;
  dropdownLinks?: DropdownLink;
  appNavigation?: AppNavigation[];
  leftElement?: React.ReactElement;
  middleElement?: React.ReactElement;
  rightElement?: React.ReactElement;
  className?: string;
}

export const Header: React.FC<React.PropsWithChildren<HeaderProps>> = ({
  logoLink,
  dropdownLinks,
  appNavigation,
  leftElement,
  middleElement,
  rightElement,
  className,
  children,
}) => {
  const items = mobileMenuItems(dropdownLinks, appNavigation);

  const [openMenu, setOpenMenu] = React.useState(false);
  const clickMenuBtn = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <Router>
      <div className={clsx(styles.header, styles.flexCenter, rightElement && styles.justifyBetween, className)}>
        <div className={clsx(styles.flexCenter, styles.headerHeight)}>
          <div>
            <a href={logoLink ?? '/'}>
              <img src={logo} alt="SubQuery Logo" width={140} />
            </a>
          </div>

          <LeftHeader leftElement={leftElement} dropdownLinks={dropdownLinks} showDivider />
          <MiddleHeader middleElement={middleElement} appNavigation={appNavigation} />
        </div>

        <>{rightElement}</>
      </div>
      <div className={styles.mHeader}>
        <div className={clsx(styles.mMenuTitle, styles.mLine)}>
          <div className={styles.mLeftMenu}>
            <a href={logoLink}>
              <img src={logo} width={140}></img>
            </a>
          </div>
          <div className={styles.mRightMenu}>
            <MenuOutlined
              className={styles.mRMenusIcon}
              width={30}
              height={30}
              onClick={clickMenuBtn}
              style={{ display: openMenu ? 'none' : '' }}
            />
            <CloseOutlined
              className={styles.mRMenusIcon}
              width={30}
              height={30}
              onClick={clickMenuBtn}
              style={{ display: openMenu ? '' : 'none' }}
            />
          </div>
        </div>
        <div className={styles.mSubMenus} style={{ display: openMenu ? '' : 'none' }}>
          {items}
        </div>
      </div>

      {children}
    </Router>
  );
};
