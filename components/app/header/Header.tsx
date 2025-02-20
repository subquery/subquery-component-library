// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import clsx from 'clsx';
import { Drawer, Space } from 'antd';
import { matchPath } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import { Dropdown, MenuWithDesc, Typography } from '../../common';
import { Context } from 'components/common/provider';
import { useBem } from 'components/utilities/useBem';
import './Header.less';
import { useMemo } from 'react';
import { createBEM } from 'components/utilities/createBem';
import { useIsMobile } from 'components/utilities/useIsMobile';

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
  const { theme, version } = React.useContext(Context);
  const sortedDropdownLinks = !leftElement && dropdownLinks && (
    <div className={clsx(bem(), theme === 'dark' ? bem({ dark: 'dark' }) : '')} id="leftHeader">
      <Dropdown
        label={dropdownLinks.label}
        LeftLabelIcon={
          <img
            src={
              version === 'v2'
                ? 'https://static.subquery.network/design/images/appIcon.svg'
                : 'https://static.subquery.network/design/images/app-icon.svg'
            }
            alt="SubQuery Apps"
          />
        }
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
          if (typeof window !== 'undefined') {
            window.open(dropdownLinks.links[parseInt(key)]?.link ?? '/', '_blank');
          }
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
    if (typeof window !== 'undefined') {
      window.location.replace(link);
    }
  },
  active = (link) =>
    !!matchPath(
      {
        path: link,
      },
      typeof window !== 'undefined' ? window.location.pathname : '',
    ),
}: MiddleHeaderProps) => {
  const { theme } = React.useContext(Context);
  const bem = useBem('subql-middle-header');

  return (
    <>
      <>{middleElement}</>
      {!middleElement && appNavigation && (
        <Space
          className={clsx(bem({ wrapper: 'wrapper' }))}
          direction={isMobile ? 'vertical' : 'horizontal'}
          size={isMobile ? 0 : 24}
        >
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
                      className: clsx(
                        bem('menu-item', {
                          active: active?.(menu.link) ? 'active' : undefined,
                          dark: theme === 'dark' ? 'dark' : undefined,
                        }),
                      ), // should refoctor
                    }))}
                    label={nav.label}
                    active={
                      nav.dropdown
                        ? active?.(nav.link || '????') || nav.dropdown.some((i) => active?.(i.link))
                        : active?.(nav.link || '????')
                    }
                    trigger={[isMobile ? 'click' : 'hover']}
                    onMenuItemClick={({ key }) => {
                      if (nav.onClick) {
                        nav.onClick(key);
                      } else if (isExternalLink(key)) {
                        if (typeof window !== 'undefined') {
                          window.open(key, '_blank');
                        }
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
  customLogo?: React.ReactNode;
  dropdownLinks?: DropdownLink;
  leftElement?: React.ReactElement;
  rightElement?: React.ReactElement;
  className?: string;
  closeDrawerAfterNavigate?: boolean;
}

// @deprecated
export const Header: React.FC<React.PropsWithChildren<HeaderProps>> = ({
  logoLink,
  customLogo,
  dropdownLinks,
  appNavigation,
  leftElement,
  middleElement,
  rightElement,
  className,
  children,
  navigate,
  active,
  closeDrawerAfterNavigate,
}) => {
  const { theme } = React.useContext(Context);
  const bem = useBem('subql-header');
  const mobileHeaderBem = useBem('subql-mobile-header');
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const MenuIcon = useMemo(() => (showMenu ? IoCloseSharp : AiOutlineMenu), [showMenu]);
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <div>
          <div
            className={clsx(mobileHeaderBem(), theme === 'dark' ? mobileHeaderBem({ dark: 'dark' }) : '', className)}
          >
            <div>
              {customLogo ? (
                customLogo
              ) : (
                <a href={logoLink ?? '/'}>
                  <img src={logoMobile} alt="SubQuery Logo" width={48} />
                </a>
              )}
            </div>

            <MenuIcon
              onClick={() => {
                setShowMenu(!showMenu);
              }}
              size={20}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <Drawer
            open={showMenu}
            placement="left"
            onClose={() => {
              setShowMenu(false);
            }}
            width={'100vw'}
            rootClassName={clsx(mobileHeaderBem('menu', { dark: theme === 'dark' ? 'dark' : null }))}
            extra={
              <>
                <div>
                  {customLogo ? (
                    customLogo
                  ) : (
                    <a href={logoLink ?? '/'}>
                      <img src={logoMobile} alt="SubQuery Logo" width={48} />
                    </a>
                  )}
                </div>

                <MenuIcon
                  onClick={() => {
                    setShowMenu(!showMenu);
                  }}
                  size={40}
                  style={{ cursor: 'pointer' }}
                />
              </>
            }
          >
            <LeftHeader leftElement={leftElement} dropdownLinks={dropdownLinks} showDivider isMobile />
            <MiddleHeader
              middleElement={middleElement}
              appNavigation={appNavigation}
              isMobile
              navigate={(link) => {
                if (closeDrawerAfterNavigate) {
                  navigate?.(link);
                  setShowMenu(false);
                }
                navigate?.(link);
              }}
              active={active}
            />
            <>{rightElement}</>
          </Drawer>
        </div>
      ) : (
        <div className={clsx(bem(), theme === 'dark' ? bem({ dark: 'dark' }) : '', className)}>
          <div className={clsx(bem('inner'))}>
            <div>
              {customLogo ? (
                customLogo
              ) : (
                <a href={logoLink ?? '/'}>
                  <img src={theme === 'light' ? logo : logoDark} alt="SubQuery Logo" width={140} />
                </a>
              )}
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
