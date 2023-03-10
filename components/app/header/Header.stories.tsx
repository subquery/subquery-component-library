// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

export default {
  title: 'APP/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => (
  <BrowserRouter>
    <Header {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});

const labels = ['About Us', 'Grants', 'SubQuery Foundation', 'Careers'];

const detailedLabels = [
  {
    label: 'SubQuery Explorer',
    description:
      'Explore SubQuery projects built by other teams in the community and hosted on SubQuery’s Managed Service. Get inspired and see what others are building!',
    link: '/',
  },
  {
    label: 'SubQuery Managed Service',
    description:
      'Use SubQuery’s Managed Service to host your SubQuery project, upgrade existing projects, and view detailed analytics on how your SubQuery Project is operating.',
    link: '/',
  },
  {
    label: 'SubQuery Kepler',
    description:
      'Decentralise your project with SubQuery Kepler Network, which provides indexed data to the global community in an incentivised and verifiable way. You can join and participate as a Consumer, Delegator, or even as an Indexer.',
    link: '/',
  },
];

const logoLink = 'https://managedservice.subquery.network/';

const appNavigation = [
  {
    label: 'SubQuery Explorer',
    link: '/explorer',
  },
  {
    label: 'Documentation',
    link: 'https://academy.subquery.network/subquery_network/testnet/welcome.html',
  },
  {
    label: 'Blog',
    link: '/blog',
  },
  {
    label: 'About',
    dropdown: labels.map((label) => ({ label, link: `/${label}` })),
  },
];

Default.args = {
  dropdownLinks: { label: 'Products', links: detailedLabels },
  appNavigation,
  logoLink,
};

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/bDNYs55azQGwtTD748mI9A/Subquery-Network-_V-2.0?node-id=50%3A8246',
  },
};
