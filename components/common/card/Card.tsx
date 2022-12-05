// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import {
  Avatar,
  Card as AntCard,
  CardProps as AntCardProps,
  Tooltip as AntTooltip,
  Dropdown as AntDropdown,
  Button as AntButton,
} from 'antd';
import Meta from 'antd/es/card/Meta';
import { InfoCircleOutlined, MoreOutlined, RightOutlined } from '@ant-design/icons';
import { Typography } from '../typography';
import styles from './Card.module.css';
import clsx from 'clsx';

export interface CardTitle {
  title?: string;
  tooltip?: string;
  tooltipIcon?: React.ReactNode;
}
export interface Item {
  label: string;
  key: string;
}

export interface MenuProps {
  items: Item[];
  onClick?: () => void;
}
export interface Button {
  label: string;
  onClick?: () => void;
}
export interface CardProp extends AntCardProps {
  className?: string;
  description?: string;
  icon?: string;
  cardTitle?: CardTitle;
  action?: MenuProps;
  button?: Button;
}
export const Card: React.FC<React.PropsWithChildren<CardProp>> = ({
  cardTitle,
  description,
  icon,
  className,
  action,
  button,
  ...props
}) => {
  return (
    <AntCard className={clsx(className, styles.card)} {...props}>
      {action && (
        <div>
          <AntDropdown menu={action}>
            <MoreOutlined className={styles.ellipsis} />
          </AntDropdown>
        </div>
      )}
      <Meta
        avatar={icon && <Avatar src={icon} />}
        title={
          <Typography
            variant="small"
            weight={600}
            color="secondary"
            tooltip={cardTitle?.tooltip}
            tooltipIcon={cardTitle?.tooltipIcon}
          >
            {cardTitle?.title?.toUpperCase()}
          </Typography>
        }
        description={
          <Typography variant="h5" className={styles.value}>
            {description?.toUpperCase()}
          </Typography>
        }
      ></Meta>
      {button && (
        <AntButton type="link" onClick={button.onClick} className={styles.button}>
          {button.label}
          <RightOutlined />
        </AntButton>
      )}
    </AntCard>
  );
};
