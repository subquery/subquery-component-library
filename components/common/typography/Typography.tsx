// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import clsx from 'clsx';
import './Typography.less';
import { Space, Tooltip } from 'antd';
import { createBEM } from 'components/utilities/createBem';
import { Context } from '../provider';
import { attachPropertiesToComponent } from 'components/utilities/attachPropertiesToCompnent';

export type TypographProps = {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'large' | 'text' | 'medium' | 'small' | 'overline';
  type?: 'default' | 'info' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  tooltip?: string;
  className?: string;
  tooltipIcon?: React.ReactNode;
  disabled?: boolean;
} & React.HTMLProps<HTMLParagraphElement>;

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
  ...htmlProps
}) => {
  const { theme } = React.useContext(Context);

  const inner = () => (
    <article
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
    >
      {children}
    </article>
  );
  if (!tooltip) {
    return <Space>{inner()}</Space>;
  }
  return (
    <Tooltip title={tooltip} placement="topLeft" className={tooltip && clsx(bem({ tooltip: 'tooltip' }))}>
      <Space className={clsx(bem({ space: 'space' }))}>
        {inner()}

        {tooltipIcon}
      </Space>
    </Tooltip>
  );
};

const Link: React.FC<LinkProps & React.HTMLProps<HTMLParagraphElement>> = (props) => {
  const { href, children, active = false, ...rest } = props;

  return (
    <a href={href} className={clsx(linkBem({ active }))}>
      <Typography {...rest}>{children}</Typography>
    </a>
  );
};

export const Typography = attachPropertiesToComponent(TypographyInner, {
  Link: Link,
});
