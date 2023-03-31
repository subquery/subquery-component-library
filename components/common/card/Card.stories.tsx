// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Card } from './Card';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import cardIcon from '../../../assets/Card-logo.svg';

const description = '0 SQT';
const title = 'You are DELEGATING';
const titleTooltip = 'The amount of kSQT that you are delegating to Indexers in the SubQuery Network to earn rewards';
const icon = cardIcon;
const dropdown = {
  items: [
    {
      label: '1st menu item',
      key: '1',
    },
    {
      label: '2nd menu item',
      key: '2',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ],
  onClick: () => {
    alert('yes');
  },
};

const action = {
  label: 'Delegate to an Indexer',
  onClick: () => {
    alert('yes');
  },
};

export default {
  title: 'General/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = ({ ...args }) => <Card {...args}></Card>;

export const Default = Template.bind({});

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/sCAngiTf2mPOWPo9kcoEE7/SubQuery-Design-System?node-id=2260%3A11147&t=8RygzxK5chQ3vEnG-0',
  },
};

Default.args = {
  description,
  title,
};

export const tooltipCard = Template.bind({});
tooltipCard.args = {
  description,
  title,
  titleTooltip,
};

export const tooltipIconCard = Template.bind({});
tooltipIconCard.args = {
  icon,
  description,
  title,
  titleTooltip,
};

export const tooltipIconDropdownCard = Template.bind({});
tooltipIconDropdownCard.args = {
  icon,
  description,
  title,
  titleTooltip,
  dropdown,
};

export const tooltipDropdownButtonCard = Template.bind({});
tooltipDropdownButtonCard.args = {
  description,
  title,
  titleTooltip,
  action,
  dropdown,
};
