// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import clsx from 'clsx';
import { NavLink, useNavigate, BrowserRouter as Router } from 'react-router-dom';
import { Space, Divider } from 'antd';
import useScreen from 'use-screen';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import styles from './Header.module.css';
import { Button, Dropdown, MenuWithDesc, Typography } from '../../common';
import logo from '../../../assets/logo.svg';
import appIcon from '../../../assets/appIcon.svg';

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
  isMobile?: boolean;
}
const LeftHeader = ({ leftElement, dropdownLinks, showDivider, isMobile }: LeftHeaderProps) => {
  const sortedDropdownLinks = !leftElement && dropdownLinks && (
    <div
      className={clsx(
        styles.leftElement,
        styles.headerHeight,
        isMobile && styles.mobileLeftHeader,
        isMobile && styles.mobileMenuItemBottom,
      )}
      id="leftHeader"
    >
      <Dropdown
        label={dropdownLinks.label}
        LeftLabelIcon={<img src={appIcon} alt="SubQuery Apps" />}
        menuitem={dropdownLinks.links.map((label, key) => ({
          key,
          label: <MenuWithDesc title={label.label} description={label.description} className={styles.dropMenu} />,
        }))}
        trigger={[isMobile ? 'click' : 'hover']}
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
      {showDivider && <Divider type={isMobile ? 'horizontal' : 'vertical'} />}
    </Space>
  );
};

export interface MiddleHeaderProps {
  middleElement?: React.ReactNode;
  appNavigation?: AppNavigation[];
  isMobile?: boolean;
}
const MiddleHeader = ({ middleElement, appNavigation, isMobile }: MiddleHeaderProps) => {
  const navigate = useNavigate();

  const sortedAppNavigation = !middleElement && appNavigation && (
    <Space
      className={clsx(styles.flexCenter, styles.headerHeight, isMobile && styles.mobileMenuItems)}
      direction={isMobile ? 'vertical' : 'horizontal'}
    >
      {appNavigation.map((nav, idx) => {
        const showBottomBorder = isMobile && idx !== appNavigation.length - 1;
        if (nav.dropdown) {
          const dropdownMenu = nav.dropdown.map((menu) => ({ key: menu.link, label: menu.label }));
          return (
            <div
              key={nav.link}
              className={clsx(
                styles.appDropdown,
                styles.headerHeight,
                isMobile && styles.mobileDropDown,
                showBottomBorder && styles.mobileMenuItemBottom,
              )}
            >
              <Dropdown
                menuitem={dropdownMenu}
                label={nav.label}
                trigger={[isMobile ? 'click' : 'hover']}
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
        return (
          <div
            className={clsx(isMobile && styles.mobileMenuItem, showBottomBorder && styles.mobileMenuItemBottom)}
            key={nav.link}
          >
            {renderLink(nav.link ?? '/', nav.label)}
          </div>
        );
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
  const { screenWidth } = useScreen();
  const isMobile = screenWidth < 768;

  const FullHeader = () => (
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
  );

  const MenuHeader = () => {
    const [showMenu, setShowMenu] = React.useState<boolean>(false);

    const handleMenuClick = () => {
      setShowMenu(!showMenu);
    };

    const MenuIcon = showMenu ? IoCloseSharp : AiOutlineMenu;

    return (
      <div>
        <div className={clsx(styles.header, styles.flexCenter, styles.justifyBetween, styles.headerHeight, className)}>
          <div>
            <a href={logoLink ?? '/'}>
              <img src={logo} alt="SubQuery Logo" width={140} />
            </a>
          </div>

          <MenuIcon onClick={handleMenuClick} size={20} className={styles.menuIcon} />
        </div>
        {showMenu && (
          <div className={styles.mobileMenu}>
            <LeftHeader leftElement={leftElement} dropdownLinks={dropdownLinks} showDivider isMobile />
            <MiddleHeader middleElement={middleElement} appNavigation={appNavigation} isMobile />
            <>{rightElement}</>
          </div>
        )}
      </div>
    );
  };

  return (
    <Router>
      {isMobile ? <MenuHeader /> : <FullHeader />}
      {children}
    </Router>
  );
};
