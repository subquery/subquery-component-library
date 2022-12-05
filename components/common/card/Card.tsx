// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Avatar, Card as AntCard, CardProps as AntCardProps, Dropdown as AntDropdown, Button as AntButton } from 'antd';
import Meta from 'antd/es/card/Meta';
import { MoreOutlined, RightOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { Typography } from '../typography';
import styles from './Card.module.css';

export interface Item {
  label: string;
  key: string;
}

export interface MenuProps {
  items: Item[];
  onClick?: (itemKey: any) => void;
}
export interface Button {
  label: string;
  onClick?: () => void;
}
export interface CardProp extends AntCardProps {
  className?: string;
  description?: string;
  descriptionTooltip?: string;
  icon?: string;
  title?: string;
  titleTooltip?: string;
  titleTooltipIcon?: React.ReactNode;
  dropdown?: MenuProps;
  action?: Button;
}
export const Card: React.FC<React.PropsWithChildren<CardProp>> = ({
  title,
  titleTooltip,
  titleTooltipIcon,
  description,
  descriptionTooltip,
  icon,
  className,
  dropdown,
  action,
  ...props
}) => {
  return (
    <AntCard className={clsx(className, styles.card)} {...props}>
      {action && (
        <AntDropdown menu={dropdown}>
          <MoreOutlined className={styles.ellipsis} />
        </AntDropdown>
      )}
      <Meta
        avatar={icon && <Avatar src={icon} />}
        title={
          <Typography
            variant="small"
            weight={600}
            color="secondary"
            tooltip={titleTooltip}
            tooltipIcon={titleTooltipIcon}
          >
            {title?.toUpperCase()}
          </Typography>
        }
        description={
          <Typography variant="h5" className={styles.value} tooltip={descriptionTooltip}>
            {description?.toUpperCase()}
          </Typography>
        }
      ></Meta>
      {action && (
        <AntButton type="link" onClick={action.onClick} className={styles.button}>
          {action.label}
          <RightOutlined />
        </AntButton>
      )}
    </AntCard>
  );
};
