// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import clsx from 'clsx';
import { Space } from 'antd';
import useScreen from 'use-screen';
import { matchPath } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import { Dropdown, MenuWithDesc, Typography } from '../../common';
import { Context } from 'components/common/provider';
import { useBem } from 'components/utilities/useBem';
import './Header.less';
import { useMemo } from 'react';
import { createBEM } from 'components/utilities/createBem';

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
  active?: (link: string) => boolean;
  onClick?: (key: any) => void;
}

const isExternalLink = (to: string) => to.startsWith('https') || to.startsWith('http');

const renderLink = (to: string, label: string, active: (link: string) => boolean) => {
  const bem = createBEM('subql-header-navlink');
  return (
    <Typography>
      {isExternalLink(to) ? (
        <a href={to} target="_blank" className={clsx(bem())} rel="noreferrer" type="link">
          {label}
        </a>
      ) : (
        <a className={clsx(bem({ active: active?.(to) ? 'active' : null }))}>{label}</a>
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
  const bem = useBem('subql-left-header');
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
  navigate?: (link: string) => void;
  active?: (link: string) => boolean;
}
const MiddleHeader = ({
  middleElement,
  appNavigation,
  isMobile,
  navigate = (link) => {
    window.location.replace(link);
  },
  active = (link) =>
    !!matchPath(
      {
        path: link,
      },
      window.location.pathname,
    ),
}: MiddleHeaderProps) => {
  const { theme } = React.useContext(Context);
  const bem = useBem('subql-middle-header');

  return (
    <>
      <>{middleElement}</>
      {!middleElement && appNavigation && (
        <Space className={clsx(bem({ wrapper: 'wrapper' }))} direction={isMobile ? 'vertical' : 'horizontal'} size={24}>
          {appNavigation.map((nav, index) => {
            if (nav.dropdown) {
              return (
                <div key={nav.link || index} className={clsx(bem('item'), `middle-item-${index}`)}>
                  <Dropdown
                    rootClassName={clsx(bem('menu-wrapper'))}
                    menuClassName={clsx(bem('menu', { dark: theme === 'dark' ? 'dark' : null }))}
                    menuitem={nav.dropdown.map((menu) => ({
                      key: menu.link,
                      label: <Typography>{menu.label}</Typography>,
                      className: clsx(bem('menu-item'), theme === 'dark' && bem('menu-item', { dark: 'dark' })), // should refoctor
                    }))}
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
                    onLableClick={() => {
                      if (nav.link) {
                        navigate(nav.link);
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
              <div
                className={clsx(bem('item'))}
                key={nav.link || index}
                onClickCapture={(e) => {
                  if (!isExternalLink(nav.link ?? '/')) {
                    navigate(nav.link ?? '/');
                    e.stopPropagation();
                    e.preventDefault();
                  }
                }}
              >
                {renderLink(nav.link ?? '/', nav.label, nav.active || active)}
              </div>
            );
          })}
        </Space>
      )}
    </>
  );
};

export interface HeaderProps extends MiddleHeaderProps {
  logoLink?: string;
  dropdownLinks?: DropdownLink;
  leftElement?: React.ReactElement;
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
  navigate,
  active,
}) => {
  const { theme } = React.useContext(Context);
  const bem = useBem('subql-header');
  const mobileHeaderBem = useBem('subql-mobile-header');
  const { screenWidth } = useScreen();
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const MenuIcon = useMemo(() => (showMenu ? IoCloseSharp : AiOutlineMenu), [showMenu]);
  const isMobile = useMemo(() => screenWidth < 768, [screenWidth]);

  return (
    <>
      {isMobile ? (
        <div>
          <div
            className={clsx(mobileHeaderBem(), theme === 'dark' ? mobileHeaderBem({ dark: 'dark' }) : '', className)}
          >
            <div>
              <a href={logoLink ?? '/'}>
                <img src={logoMobile} alt="SubQuery Logo" width={48} />
              </a>
            </div>

            <MenuIcon
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              size={20}
              style={{ cursor: 'pointer' }}
            />
          </div>
          {showMenu && (
            <div className={clsx(mobileHeaderBem('menu', { dark: theme === 'dark' ? 'dark' : null }))}>
              <LeftHeader leftElement={leftElement} dropdownLinks={dropdownLinks} showDivider isMobile />
              <MiddleHeader
                middleElement={middleElement}
                appNavigation={appNavigation}
                isMobile
                navigate={navigate}
                active={active}
              />
              <>{rightElement}</>
            </div>
          )}
        </div>
      ) : (
        <div className={clsx(bem(), theme === 'dark' ? bem({ dark: 'dark' }) : '', className)}>
          <div className={clsx(bem('inner'))}>
            <div>
              <a href={logoLink ?? '/'}>
                <img src={theme === 'light' ? logo : logoDark} alt="SubQuery Logo" width={140} />
              </a>
            </div>

            <LeftHeader leftElement={leftElement} dropdownLinks={dropdownLinks} showDivider />
            <MiddleHeader
              middleElement={middleElement}
              appNavigation={appNavigation}
              navigate={navigate}
              active={active}
            />
          </div>

          <>{rightElement}</>
        </div>
      )}
      {children}
    </>
  );
};
