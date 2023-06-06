// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { GraphiQLExplorer } from './GraphiQLExplorer';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'General/GraphiQL Explorer',
  component: GraphiQLExplorer,
} as ComponentMeta<typeof GraphiQLExplorer>;

const Template: ComponentStory<typeof GraphiQLExplorer> = (args) => (
  <div style={{ height: '100vh' }}>
    <GraphiQLExplorer {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  url: 'https://api.subquery.network/sq/subquery/kepler-testnet',
  defaultQuery: ` 
  query {
    _metadata {
      indexerHealthy
      indexerNodeVersion
    }
  }`,
  explorerOpen: true,
};
