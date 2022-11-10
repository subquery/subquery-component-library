// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Space } from 'antd';
import React from 'react';
import { Button, Typography } from '..';
import { openNotification } from './';

export default {
  title: 'General/Notification',
  component: openNotification,
};

const Template: ComponentStory<any> = (args) => {
  return (
    <Space>
      <Button
        colorScheme="standard"
        onClick={() => {
          openNotification(args);
        }}
        label={'Open Notification'}
      />

      <Button
        colorScheme="standard"
        onClick={() => {
          openNotification({ ...args, type: 'error' });
        }}
        label={'Open Notification with Error'}
      />
    </Space>
  );
};

export const All = Template.bind({});

All.args = {
  title: 'Notification',
  description: 'This is notification',
};
