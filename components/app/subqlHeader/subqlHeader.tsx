// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { FC, useMemo } from 'react';
import './subqlHeader.less';
import { useBem } from 'components/utilities/useBem';
import clsx from 'clsx';
import { Typography } from 'components/common';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { Drawer, Popover } from 'antd';
import { IoCloseSharp } from 'react-icons/io5';
import { AiOutlineMenu } from 'react-icons/ai';
import { useIsMobile } from 'components/utilities/useIsMobile';

interface ISubqlHeaderNavigatorItem {
  key: string;
  label: React.ReactNode;
  // if href provide, then navigate will be ignored
  link?: string;
  navigate?: (path?: string) => void;
  active?: (path?: string) => boolean;
  dropdownClassName?: string;
  popoverClassName?: string;
  dropdown?: {
    description?: React.ReactNode;
    defaultDescription?: {
      title?: string;
      content?: string;
    };
    items: {
      label: React.ReactNode;
      description?: React.ReactNode;
      link: string;
    }[];
  };
  initialRenderMode?: 'desktop' | 'mobile';
}

interface ISubqlHeader {
  logo?: React.ReactNode;
  logoHref?: string;
  className?: string;
  navigate?: () => void;
  dropdownClassName?: string;
  popoverClassName?: string;
  drawerClassName?: string;
  mainNavigators?: ISubqlHeaderNavigatorItem[];
  extraNavigators?: React.ReactNode;
  initialRenderMode?: 'desktop' | 'mobile';
}

const defaultDropdownDescription: FC<{
  title?: string;
  content?: string;
  initialRenderMode?: 'desktop' | 'mobile';
}> = ({ title, content, initialRenderMode }) => {
  const isMobile = useIsMobile(initialRenderMode);
  if (isMobile) {
    return '';
  }
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Typography variant="h4">{title || 'Our Products'}</Typography>
        <Typography type="secondary" variant="medium" width={240}>
          {content || 'The SubQuery Network is full of globally distributed Indexers and RPC providers.'}
        </Typography>
      </div>

      <img
        src="https://static.subquery.network/design/images/header-flowers.png"
        width={266}
        style={{ marginTop: -24, width: '267px', objectFit: 'contain' }}
      ></img>
    </div>
  );
};

export const SubqlHeaderNavigatorItem: FC<ISubqlHeaderNavigatorItem> = (props) => {
  const {
    label,
    link,
    navigate,
    active = (path?: string) => {
      if (path) {
        if (typeof window !== 'undefined') {
          return window.location.pathname.includes(path);
        }
        return false;
      }

      return false;
    },
    dropdown,
    dropdownClassName,
    popoverClassName,
    initialRenderMode,
  } = props;

  const bem = useBem('subql-app-header-navigator-item');
  const isMobile = useIsMobile(initialRenderMode);

  return (
    <Popover
      overlayClassName={clsx(bem('popover'), popoverClassName)}
      arrow={false}
      placement="bottom"
      content={
        dropdown ? (
          <div className={clsx(bem('dropdown-wrapper'), dropdownClassName)}>
            {dropdown.description || defaultDropdownDescription(dropdown.defaultDescription || {})}
            <div className={clsx(bem('dropdown'))}>
              {dropdown.items.map((item) => (
                <div key={item.link} className={clsx(bem('dropdown-item'))}>
                  <Typography.Link
                    className={clsx(
                      bem('dropdown-item-title', {
                        active: active?.(item.link),
                      }),
                    )}
                    href={item.link}
                    weight={500}
                    onClick={(e) => {
                      if (navigate) {
                        e.preventDefault();
                        navigate(item.link);
                      }
                    }}
                    active={active?.(item.link)}
                  >
                    {item.label}
                  </Typography.Link>

                  {item.description && (
                    <Typography variant="medium" type="secondary" width={isMobile ? '100%' : 360}>
                      {item.description}
                    </Typography>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          ''
        )
      }
    >
      <Typography.Link
        className={clsx(
          bem({
            active: active?.(link),
            dropdown: dropdown ? true : undefined,
          }),
        )}
        href={link}
        weight={500}
        onClick={(e) => {
          if (navigate) {
            e.preventDefault();
            navigate(link);
          }
        }}
        active={active?.(link)}
        variant="medium"
        target="_blank"
      >
        {label}
        {dropdown ? <MdKeyboardArrowUp style={{ fontSize: '1rem' }}></MdKeyboardArrowUp> : ''}
      </Typography.Link>
    </Popover>
  );
};

const SubqlHeader: FC<ISubqlHeader> = ({
  logo,
  logoHref,
  className,
  dropdownClassName,
  popoverClassName,
  drawerClassName,
  mainNavigators,
  extraNavigators,
  initialRenderMode,
}) => {
  const bem = useBem('subql-app-header');
  const isMobile = useIsMobile(initialRenderMode);
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const MenuIcon = useMemo(() => (showMenu ? IoCloseSharp : AiOutlineMenu), [showMenu]);

  return (
    <div className={clsx(bem(), className)}>
      {logo ? (
        logo
      ) : (
        <a className={clsx(bem('logo'))} href={logoHref || '/'}>
          <img
            src="https://static.subquery.network/logo/subquery_logo_white.svg"
            alt="SubQuery Logo"
            style={{
              width: '8.75rem',
            }}
          />
        </a>
      )}

      <span style={{ flex: 1 }}></span>
      {isMobile ? (
        <>
          <MenuIcon
            onClick={() => {
              setShowMenu(!showMenu);
            }}
            size={20}
            style={{ cursor: 'pointer' }}
          />
          <Drawer
            open={showMenu}
            placement="right"
            onClose={() => {
              setShowMenu(false);
            }}
            width={'100vw'}
            rootClassName={clsx(bem('menu'), drawerClassName)}
            extra={
              <>
                <div>
                  {logo ? (
                    logo
                  ) : (
                    <a className={clsx(bem('logo'))} href={logoHref || '/'}>
                      <img
                        src="https://static.subquery.network/logo/subquery_logo_white.svg"
                        alt="SubQuery Logo"
                        style={{
                          width: '8.75rem',
                        }}
                      />
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
            <div className={clsx(bem('mobile-body'))}>
              {mainNavigators
                ? mainNavigators.map((mainNavigator) => (
                    <SubqlHeaderNavigatorItem
                      {...mainNavigator}
                      key={mainNavigator.key}
                      dropdownClassName={dropdownClassName}
                      popoverClassName={popoverClassName}
                      initialRenderMode={initialRenderMode}
                    ></SubqlHeaderNavigatorItem>
                  ))
                : ''}

              {extraNavigators}
            </div>
          </Drawer>
        </>
      ) : (
        <>
          {mainNavigators
            ? mainNavigators.map((mainNavigator) => (
                <SubqlHeaderNavigatorItem
                  dropdownClassName={dropdownClassName}
                  popoverClassName={popoverClassName}
                  {...mainNavigator}
                  key={mainNavigator.key}
                ></SubqlHeaderNavigatorItem>
              ))
            : ''}

          {extraNavigators}
        </>
      )}
    </div>
  );
};
export default SubqlHeader;
