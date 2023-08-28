// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Avatar, Card as AntCard, CardProps as AntCardProps, Dropdown as AntDropdown, Button as AntButton } from 'antd';
import Meta from 'antd/es/card/Meta';
// import MoreOutlined from '@ant-design/icons/MoreOutlined';
// import RightOutlined from '@ant-design/icons/RightOutlined';
// import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined';
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
export interface CardProps extends AntCardProps {
  className?: string;
  description?: string;
  descriptionTooltip?: string;
  icon?: string;
  title?: string;
  titleTooltip?: string;
  titleTooltipIcon?: React.ReactNode;
  dropdown?: MenuProps;
  customDropdown?: React.ReactNode;
  action?: Button;
}
export const Card: React.FC<React.PropsWithChildren<CardProps>> = ({
  title,
  titleTooltip,
  titleTooltipIcon,
  description,
  descriptionTooltip,
  icon,
  className,
  dropdown,
  action,
  customDropdown,
  ...props
}) => {
  // const sortedTooltipIcon = titleTooltip && (titleTooltipIcon ?? <InfoCircleOutlined className={styles.tooltipIcon} />);
  const sortedTooltipIcon = <div></div>;
  return (
    <AntCard className={clsx(styles.card, className)} {...props}>
      {customDropdown && <div className={styles.menu}>{customDropdown}</div>}
      {dropdown && (
        <AntDropdown menu={dropdown} trigger={['click']}>
          {/* <MoreOutlined className={styles.menu} /> */}
        </AntDropdown>
      )}
      <Meta
        className={icon && styles.meta}
        avatar={icon && <Avatar src={icon} />}
        title={
          <Typography
            variant="small"
            weight={600}
            tooltip={titleTooltip}
            tooltipIcon={sortedTooltipIcon}
            className={styles.title}
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
          {/* <RightOutlined /> */}
        </AntButton>
      )}
    </AntCard>
  );
};
