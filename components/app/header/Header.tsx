// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import clsx from 'clsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { Space } from 'antd';
import useScreen from 'use-screen';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import { Dropdown, MenuWithDesc, Typography } from '../../common';
import { Context } from 'components/common/provider';
import { createBEM } from 'components/utilities/createBem';
import './Header.less';

const logo = 'https://static.subquery.network/design/images/logo.svg';
const logoDark = 'https://static.subquery.network/design/images/logo-light.svg';
const logoMobile = 'https://static.subquery.network/design/images/logo-plain.svg';

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
  onClick?: (key: any) => void;
}

const isExternalLink = (to: string) => to.startsWith('https') || to.startsWith('http');

const renderLink = (to: string, label: string) => {
  const bem = createBEM('subql-header-navlink');
  return (
    <Typography>
      {isExternalLink(to) ? (
        <a href={to} target="_blank" className={clsx(bem())} rel="noreferrer" type="link">
          {label}
        </a>
      ) : (
        <NavLink to={to} className={({ isActive }) => clsx(bem(), isActive ? bem({ active: 'active' }) : '')}>
          {label}
        </NavLink>
      )}
    </Typography>
  );
};

export interface LeftHeaderProps {
  leftElement?: React.ReactNode;
  dropdownLinks?: DropdownLink;
  showDivider?: boolean;
  isMobile?: boolean;
}
const LeftHeader = ({ leftElement, dropdownLinks, isMobile }: LeftHeaderProps) => {
  const bem = createBEM('subql-left-header');
  const { theme } = React.useContext(Context);
  const sortedDropdownLinks = !leftElement && dropdownLinks && (
    <div className={clsx(bem(), theme === 'dark' ? bem({ dark: 'dark' }) : '')} id="leftHeader">
      <Dropdown
        label={dropdownLinks.label}
        LeftLabelIcon={<img src="https://static.subquery.network/design/images/appIcon.svg" alt="SubQuery Apps" />}
        menuitem={dropdownLinks.links.map((label, key) => ({
          key,
          label: <MenuWithDesc title={label.label} description={label.description} width={isMobile ? '100%' : 366} />,
          className: clsx(bem('dropdown-item')),
        }))}
        trigger={[isMobile ? 'click' : 'hover']}
        active
        rootClassName={clsx(bem('dropdown', { wrapper: 'wrapper' }))}
        menuClassName={clsx(bem('dropdown'), theme === 'dark' ? bem('dropdown', { dark: 'dark' }) : '')}
        onMenuItemClick={({ key }) => {
          window.open(dropdownLinks.links[parseInt(key)]?.link ?? '/', '_blank');
        }}
        getPopupContainer={() => document.getElementById('leftHeader') as HTMLElement}
      />
    </div>
  );

  return (
    <div className={clsx(bem('wrapper'))}>
      <>{leftElement}</>
      <>{sortedDropdownLinks}</>
    </div>
  );
};

export interface MiddleHeaderProps {
  middleElement?: React.ReactNode;
  appNavigation?: AppNavigation[];
  isMobile?: boolean;
}
const MiddleHeader = ({ middleElement, appNavigation, isMobile }: MiddleHeaderProps) => {
  const navigate = useNavigate();
  const { theme } = React.useContext(Context);
  const bem = createBEM('subql-middle-header');
  const sortedAppNavigation = !middleElement && appNavigation && (
    <Space className={clsx(bem({ wrapper: 'wrapper' }))} direction={isMobile ? 'vertical' : 'horizontal'}>
      {appNavigation.map((nav, index) => {
        if (nav.dropdown) {
          const dropdownMenu = nav.dropdown.map((menu) => ({
            key: menu.link,
            label: <Typography>{menu.label}</Typography>,
            className: clsx(bem('menu-item'), theme === 'dark' && bem('menu-item', { dark: 'dark' })), // should refoctor
          }));
          return (
            <div key={nav.link} className={clsx(bem('item'), `middle-item-${index}`)}>
              <Dropdown
                rootClassName={clsx(bem('menu-wrapper'))}
                menuClassName={theme === 'dark' ? clsx(bem('menu', { dark: 'dark' })) : ''}
                menuitem={dropdownMenu}
                label={nav.label}
                trigger={[isMobile ? 'click' : 'hover']}
                onMenuItemClick={({ key }) => {
                  if (nav.onClick) {
                    nav.onClick(key);
                  } else if (isExternalLink(key)) {
                    window.open(key, '_blank');
                  } else {
                    navigate(key);
                  }
                }}
                getPopupContainer={() => {
                  return document.querySelector(`.middle-item-${index}`) as HTMLElement;
                }}
              />
            </div>
          );
        }
        return (
          <div className={clsx(bem('item'))} key={nav.link}>
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
  const { theme } = React.useContext(Context);
  const bem = createBEM('subql-header');
  const FullHeader = () => (
    <div className={clsx(bem(), theme === 'dark' ? bem({ dark: 'dark' }) : '', className)}>
      <div className={clsx(bem('inner'))}>
        <div>
          <a href={logoLink ?? '/'}>
            <img src={theme === 'light' ? logo : logoDark} alt="SubQuery Logo" width={140} />
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
    const bem = createBEM('subql-mobile-header');
    const { theme } = React.useContext(Context);
    const handleMenuClick = () => {
      setShowMenu(!showMenu);
    };

    const MenuIcon = showMenu ? IoCloseSharp : AiOutlineMenu;

    return (
      <div>
        <div className={clsx(bem(), theme === 'dark' ? bem({ dark: 'dark' }) : '', className)}>
          <div>
            <a href={logoLink ?? '/'}>
              <img src={logoMobile} alt="SubQuery Logo" width={48} />
            </a>
          </div>

          <MenuIcon onClick={handleMenuClick} size={20} style={{ cursor: 'pointer' }} />
        </div>
        {showMenu && (
          <div className={clsx(bem('menu', { dark: theme === 'dark' ? 'dark' : null }))}>
            <LeftHeader leftElement={leftElement} dropdownLinks={dropdownLinks} showDivider isMobile />
            <MiddleHeader middleElement={middleElement} appNavigation={appNavigation} isMobile />
            <>{rightElement}</>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {isMobile ? <MenuHeader /> : <FullHeader />}
      {children}
    </>
  );
};
