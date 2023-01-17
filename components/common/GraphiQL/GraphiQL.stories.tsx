// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { GraphiQL } from './GraphiQL';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'General/GraphiQL',
  component: GraphiQL,
} as ComponentMeta<typeof GraphiQL>;

const Template: ComponentStory<typeof GraphiQL> = (args) => (
  <div style={{ height: '100vh' }}>
    <GraphiQL {...args} />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  url: 'https://api.subquery.network/sq/subquery/kepler-testnet-subql-project',
  defaultQuery: ` 
  query {
    _metadata {
      indexerHealthy
      indexerNodeVersion
    }
  }`,
};
