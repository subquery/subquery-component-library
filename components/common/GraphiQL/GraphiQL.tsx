// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createGraphiQLFetcher, Fetcher } from '@graphiql/toolkit';
import { GraphiQL as GraphiQLPlayground, GraphiQLProps } from 'graphiql';
import 'graphiql/graphiql.min.css';

export interface IGraphiQL extends GraphiQLProps {
  bearToken?: string;
  url: string;
}

export const GraphiQL: React.FC<IGraphiQL> = ({ bearToken, url, fetcher, defaultQuery }) => {
  const headers = {
    'content-type': 'application/json',
  };

  const sortedHeaders = bearToken ? { ...headers, Authorization: `Bearer ${bearToken}` } : headers;

  const sortedFetcher = createGraphiQLFetcher({
    url,
    headers: sortedHeaders,
  });

  return <GraphiQLPlayground fetcher={fetcher ?? sortedFetcher} defaultQuery={defaultQuery} />;
};
