// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL as GraphiQLPlayground, GraphiQLProps } from 'graphiql';
import 'graphiql/graphiql.min.css';

export interface IGraphiQL extends GraphiQLProps {
  bearToken?: string;
  url: string;
}

export const createSortedFetcher = ({ bearToken, url }: { bearToken?: string; url: string }) => {
  const headers = {
    'content-type': 'application/json',
  };
  const sortedHeaders = bearToken ? { ...headers, Authorization: `Bearer ${bearToken}` } : headers;
  return createGraphiQLFetcher({
    url,
    headers: sortedHeaders,
  });
};

export const GraphiQL: React.FC<IGraphiQL> = ({ bearToken, url, fetcher, defaultQuery, ...graphiQLProps }) => {
  return (
    <GraphiQLPlayground
      fetcher={fetcher ?? createSortedFetcher({ bearToken, url })}
      defaultQuery={defaultQuery}
      {...graphiQLProps}
    />
  );
};
