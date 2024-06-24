// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { FC } from 'react';
import { BsInfoCircle } from 'react-icons/bs';
import { Card, CardProps, Tooltip } from 'antd';
import clsx from 'clsx';
import { isString } from 'lodash-es';

import './subqlCard.less';
import { useBem } from 'components/utilities/useBem';
import { Typography } from '../typography';

interface SubqlCardProps extends CardProps {
  title?: React.ReactNode;
  titleExtra?: React.ReactNode;
  tooltip?: React.ReactNode;
  children?: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
}

export const SubqlCard: FC<SubqlCardProps> = ({
  children,
  title,
  titleExtra,
  tooltip,
  width,
  style,
  className,
  ...rest
}) => {
  const bem = useBem('subql-card');
  return (
    <Card
      {...rest}
      className={clsx(bem({ withoutBody: !children ? 'withoutBody' : undefined }), className)}
      title={
        <div className="col-flex">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isString(title) ? <Typography>{title}</Typography> : title}
            {tooltip ? (
              <Tooltip title={tooltip}>
                <BsInfoCircle style={{ color: 'var(--sq-gray500)', fontSize: 14, marginLeft: 8 }}></BsInfoCircle>
              </Tooltip>
            ) : (
              ''
            )}
          </div>
          <div style={{ marginTop: 12 }}>{titleExtra}</div>
        </div>
      }
      style={{ width: width ? `${width}px` : 'auto', ...style }}
    >
      {children && <div className={clsx(bem('split'))}></div>}
      {children}
    </Card>
  );
};
