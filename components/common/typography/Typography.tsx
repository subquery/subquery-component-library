// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import clsx from 'clsx';
import { GoAlertFill } from 'react-icons/go';
import { Tooltip } from 'antd';
import { createBEM } from 'components/utilities/createBem';
import { Context } from '../provider';
import { attachPropertiesToComponent } from 'components/utilities/attachPropertiesToCompnent';
import { useMemo } from 'react';
import { Modal } from '../modal';
import './Typography.less';
import { waitForSomething } from 'components/utilities/waitForSomething';

export type TypographProps = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'large' | 'text' | 'medium' | 'small' | 'overline';
  type?: 'default' | 'info' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  tooltip?: string;
  className?: string;
  tooltipIcon?: React.ReactNode;
  disabled?: boolean;
  center?: boolean;
  maxWidth?: string | number | undefined;
  withShadow?: boolean;
  shadowPosition?: 'center' | 'left' | 'right';
} & React.HTMLProps<HTMLParagraphElement>;

const componentsName: { [key in string]: keyof JSX.IntrinsicElements } = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  large: 'article',
  text: 'article',
  medium: 'article',
  small: 'article',
  overline: 'article',
};

export interface LinkProps extends TypographProps {
  href?: string;
  children?: React.ReactNode;
  active?: boolean;
  type?: 'default' | 'info' | 'danger';
}

const bem = createBEM('subql-typography');
const linkBem = createBEM('subql-typography-link');
const whiteListLinks = [
  /.*\.{0,1}subquery\.network/,
  /.*\.{0,1}subquery\.foundation/,
  /.*\.{0,1}onfinality\.io/,
  /.*\.{0,1}github\.com/,
  /.*\.{0,1}discord\.com/,
  /.*\.{0,1}twitter\.com/,
  /.*\.{0,1}medium\.com/,
  /.*\.{0,1}linkedin\.com/,
  /.*\.{0,1}youtube\.com/,
  /.*\.{0,1}t\.me/,
  /.*\.{0,1}x\.com/,
];

const TypographyInner: React.FC<TypographProps> = ({
  children,
  variant = 'text',
  type = 'default',
  weight = 400,
  tooltip,
  tooltipIcon,
  className,
  disabled,
  center,
  style,
  width,
  maxWidth,
  color,
  withShadow = false,
  shadowPosition = 'center',
  ...htmlProps
}) => {
  const Component = useMemo<keyof JSX.IntrinsicElements>(() => componentsName[variant], [variant]);
  const { theme } = React.useContext(Context);
  const inner = () => (
    // TODO: fix this type
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Component
      {...htmlProps}
      className={clsx(
        bem(),
        theme === 'dark' ? bem({ dark: 'dark' }) : '',
        bem(variant),
        bem(type),
        bem(`w${weight}`),
        bem({ disabled }),
        bem({ withShadow }),
        bem(`shadow${shadowPosition}`),
        className,
      )}
      style={{ textAlign: center ? 'center' : undefined, width, maxWidth, color, ...style }}
    >
      {withShadow ? <span style={{ position: 'relative', zIndex: 1 }}>{children}</span> : children}
    </Component>
  );
  if (!tooltip) {
    return inner();
  }
  return (
    <Tooltip title={tooltip} placement="topLeft" className={tooltip && clsx(bem({ tooltip: 'tooltip' }))}>
      {inner()}

      {tooltipIcon}
    </Tooltip>
  );
};

const Link: React.FC<LinkProps & React.HTMLProps<HTMLAnchorElement>> = (props) => {
  const { href, children, onClick, target, active = false, ...rest } = props;

  return (
    <a
      href={href}
      className={clsx(linkBem({ active }))}
      target={target}
      onClick={async (e) => {
        if (onClick) {
          onClick(e);
          return;
        }
        if (!href || !href.startsWith('http')) {
          return;
        }

        try {
          new URL(href);
        } catch (err) {
          e.preventDefault();
          return;
        }

        const validHref = new URL(href);
        console.warn(validHref.hostname, whiteListLinks);
        if (
          !whiteListLinks.some((link) => {
            return new RegExp(link).test(validHref.hostname);
          })
        ) {
          e.preventDefault();
          let continueShowToastStatus: 'stop' | 'pending' = 'pending';
          Modal.confirm({
            icon: null,
            width: 376,
            className: clsx(bem('external-link-modal')),
            content: (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <GoAlertFill style={{ color: 'var(--sq-error)', fontSize: 40 }} />
                <Typography weight={600} variant="large">
                  External Link Warning
                </Typography>
                <Typography variant="medium" style={{ textAlign: 'center' }}>
                  You are about to leave SubQuery Network to visit an external website. If you trust the link you can
                  proceed to this website or click “Stay Here” to return.
                </Typography>

                <Typography weight={600} variant="medium" style={{ textAlign: 'center' }}>
                  <i style={{ wordBreak: 'break-all', width: '100%' }}>
                    External link: {href.slice(0, 120)}
                    {href.length > 120 ? '...' : ''}
                  </i>
                </Typography>
              </div>
            ),
            cancelButtonProps: {
              style: {
                display: 'block',
              },
              shape: 'round',
              size: 'large',
            },
            cancelText: 'Stay Here',
            okText: 'Proceed',
            okButtonProps: {
              size: 'large',
              type: 'primary',
              shape: 'round',
              danger: true,
              style: {
                display: 'block',
              },
            },
            onOk: () => {
              const a = document.createElement('a');
              a.href = href;
              a.target = target || '_blank';
              a.rel = 'noreferrer noopener';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              continueShowToastStatus = 'stop';
            },

            onCancel: () => {
              continueShowToastStatus = 'stop';
            },
          });

          await waitForSomething({
            func: () => {
              return continueShowToastStatus !== 'pending';
            },
            splitTime: 500,
          });
        }
      }}
    >
      <Typography {...rest}>{children}</Typography>
    </a>
  );
};

export const Typography = attachPropertiesToComponent(TypographyInner, {
  Link: Link,
});
