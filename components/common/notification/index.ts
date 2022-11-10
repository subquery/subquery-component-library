// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { notification as antdNotification } from 'antd';
import { COLORS } from '../../utilities';

const borderColorMapping = {
  ['info']: COLORS.primary,
  ['success']: COLORS.success,
  ['error']: COLORS.error,
};
export interface NotificationProps {
  type?: 'info' | 'success' | 'error';
  title?: string;
  description?: string;
  className?: string;
  duration?: number;
}

export const openNotification = ({
  type = 'info',
  title = 'Notification',
  description,
  className,
  duration = 30,
}: NotificationProps): void => {
  antdNotification[type]({
    message: title,
    description: description,
    style: {
      borderBottom: `4px solid ${borderColorMapping[type]}`,
      overflow: 'scroll',
    },
    duration,
    className,
  });
};
