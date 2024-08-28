// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import clsx from 'clsx';
import './Typography.less';
import { Tooltip } from 'antd';
import { createBEM } from 'components/utilities/createBem';
import { Context } from '../provider';
import { attachPropertiesToComponent } from 'components/utilities/attachPropertiesToCompnent';
import { useMemo } from 'react';

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
        className,
      )}
      style={{ textAlign: center ? 'center' : undefined, width, maxWidth, color, ...style }}
    >
      {children}
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

const Link: React.FC<LinkProps & React.HTMLProps<HTMLParagraphElement>> = (props) => {
  const { href, children, active = false, target, ...rest } = props;

  return (
    <a href={href} target={target} className={clsx(linkBem({ active }))}>
      <Typography {...rest}>{children}</Typography>
    </a>
  );
};

export const Typography = attachPropertiesToComponent(TypographyInner, {
  Link: Link,
});
