// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { message } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { Dropdown } from './Dropdown';

export default {
  title: 'Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});

Default.args = {
  label: 'About',
  menu: [
    { key: '1', label: 'About Us' },
    { key: '2', label: 'Grants' },
    { key: '3', label: 'SubQuery Foundation' },
    { key: '4', label: 'Careers' },
  ],
  onMenuItemClick: (item) => message.info(`Click on item ${item?.key}`),
};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/bDNYs55azQGwtTD748mI9A/Subquery-Network-_V-2.0?node-id=50%3A8246',
  },
};

export const WithLeftIcon = Template.bind({});

WithLeftIcon.args = {
  label: 'Apps',
  LeftLabelIcon: <AppstoreOutlined />,
  menu: [
    { key: '1', label: 'About Us' },
    { key: '2', label: 'Grants' },
    { key: '3', label: 'SubQuery Foundation' },
    { key: '4', label: 'Careers' },
  ],
  onMenuItemClick: (item) => message.info(`Click on item ${item?.key}`),
};
