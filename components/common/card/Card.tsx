// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Avatar, Card as AntCard, CardProps as AntCardProps, Tooltip, Tooltip as AntTooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Typography } from '../typography';
import styles from './Card.module.css';
import clsx from 'clsx';

export interface cardTitle {
  title?: string;
  tooltip?: string;
}
export interface CardProp extends AntCardProps {
  className?: string;
  description?: string;
  icon?: string;
  cardTitle?: cardTitle;
}
export const Card: React.FC<React.PropsWithChildren<CardProp>> = ({ cardTitle, description, icon, className }) => {
  return (
    <AntCard className={clsx(className, styles.card)}>
      <Meta
        avatar={icon && <Avatar src={icon} />}
        title={<CardTitle title={cardTitle?.title} tooltip={cardTitle?.tooltip} />}
        description={
          <Typography variant="h5" className={styles.value}>
            {description?.toUpperCase()}
          </Typography>
        }
      ></Meta>
    </AntCard>
  );
};

export const CardTitle: React.FC<cardTitle> = (props) => {
  return props.tooltip ? (
    <Typography variant="medium" className={clsx(styles.title, props.tooltip)}>
      {props.title?.toUpperCase()}
      <AntTooltip title={props.tooltip} className={styles.tooltip}>
        <InfoCircleOutlined />
      </AntTooltip>
    </Typography>
  ) : (
    <Typography className={clsx(styles.title)}>{props.title?.toUpperCase()}</Typography>
  );
};
