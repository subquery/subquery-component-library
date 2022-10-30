// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Tab, Tabs as AppTabs } from './Tabs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { PicCenterOutlined, PaperClipOutlined } from '@ant-design/icons';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
  title: 'Tab',
  component: Tab,
} as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = ({ ...args }) => <Tab {...args} />;

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/sCAngiTf2mPOWPo9kcoEE7/SubQuery-Design-System?node-id=570%3A6619',
  },
};

Default.args = {
  label: 'Tab',
  active: true,
};

const TabsTemplate: ComponentStory<typeof AppTabs> = ({ ...args }) => <AppTabs {...args} />;

export const Tabs = TabsTemplate.bind({});

Tabs.args = {
  tabs: [
    { label: 'Tab 0', icon: <PicCenterOutlined /> },
    { label: 'Tab 1', icon: <PaperClipOutlined /> },
  ],
};

Tabs.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/sCAngiTf2mPOWPo9kcoEE7/SubQuery-Design-System?node-id=570%3A6619',
  },
};

const TabLinksTemplate: ComponentStory<typeof AppTabs> = ({ ...args }) => (
  <Router>
    <AppTabs {...args} />
  </Router>
);

export const TabLinks = TabLinksTemplate.bind({});

TabLinks.args = {
  tabs: [{ label: 'Tab 0', link: '/' }, { label: 'Tab 1' }],
};
