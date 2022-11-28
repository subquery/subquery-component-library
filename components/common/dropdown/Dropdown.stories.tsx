// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { message } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { Dropdown, MenuWithDesc } from './Dropdown';
import styles from './Dropdown.module.css';

export default {
  title: 'General/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});

const labels = ['About Us', 'Grants', 'SubQuery Foundation', 'Careers'];

Default.args = {
  label: 'About',
  menuitem: labels.map((label, idx) => ({ key: idx, label })),
  onMenuItemClick: ({ key }) => message.info(`Click on item: ${labels[parseInt(key)]}`),
};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/bDNYs55azQGwtTD748mI9A/Subquery-Network-_V-2.0?node-id=50%3A8246',
  },
};

export const WithLeftIcon = Template.bind({});

const detailedLabels = [
  {
    title: 'SubQuery Explorer',
    description:
      'Explore SubQuery projects built by other teams in the community and hosted on SubQuery’s Managed Service. Get inspired and see what others are building!',
  },
  {
    title: 'SubQuery Managed Service',
    description:
      'Use SubQuery’s Managed Service to host your SubQuery project, upgrade existing projects, and view detailed analytics on how your SubQuery Project is operating.',
  },
  {
    title: 'SubQuery Kepler',
    description:
      'Decentralise your project with SubQuery Kepler Network, which provides indexed data to the global community in an incentivised and verifiable way. You can join and participate as a Consumer, Delegator, or even as an Indexer.',
  },
];

WithLeftIcon.args = {
  label: 'Apps',
  LeftLabelIcon: <AppstoreOutlined />,
  menuitem: detailedLabels.map((label, key) => ({
    key,
    label: <MenuWithDesc title={label.title} description={label.description} />,
  })),
  active: true,
  menuClassName: styles.menuOverlay,
  onMenuItemClick: (item) => message.info(`Click on item ${item?.key}`),
};

WithLeftIcon.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/bDNYs55azQGwtTD748mI9A/Subquery-Network-_V-2.0?node-id=50%3A6616',
  },
};
