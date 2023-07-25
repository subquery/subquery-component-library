// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { GraphiQL } from './GraphiQL';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'General/GraphiQL',
  component: GraphiQL,
} as ComponentMeta<typeof GraphiQL>;

const Template: ComponentStory<typeof GraphiQL> = (args) => {
  return (
    <div style={{ height: '100vh' }}>
      <GraphiQL
        {...args}
        theme="dark"
        onQueryResponse={(res) => {
          console.warn(res);
        }}
      />
    </div>
  );
};

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
  explorerDefaultOpen: true,
};
