// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createGraphiQLFetcher, FetcherParams, FetcherOpts, FetcherReturnType } from '@graphiql/toolkit';
import { GraphiQL as GraphiQLPlayground, GraphiQLProps } from 'graphiql';
import { useExplorerPlugin } from '@graphiql/plugin-explorer';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from '@graphiql/react';
import 'graphiql/graphiql.min.css';
import '@graphiql/plugin-explorer/dist/style.css';
import './GraphiQL.module.css';

export interface IGraphiQL extends Omit<GraphiQLProps, 'fetcher'> {
  url: string;
  bearToken?: string;
  explorerDefaultOpen?: boolean;
  fetcher?: GraphiQLProps['fetcher'];
  onQueryResponse?: (res: FetcherReturnType) => void;
  theme?: 'dark' | 'light';
}

const defaultHeaders = {
  'content-type': 'application/json',
};

export const GraphiQL: React.FC<IGraphiQL> = ({
  bearToken,
  url,
  fetcher,
  defaultQuery,
  explorerDefaultOpen,
  onEditQuery,
  onQueryResponse,
  theme = 'light',
  ...graphiQLProps
}) => {
  const { setTheme } = useTheme();
  // The fetcher is defined once and doesnt need to be re-rendered everytime
  const sortedFetcher = useMemo(() => {
    const sortedHeaders = bearToken //
      ? { ...defaultHeaders, Authorization: `Bearer ${bearToken}` }
      : defaultHeaders;
    return createGraphiQLFetcher({ url, headers: sortedHeaders });
  }, [bearToken, url]);

  // Controlled query, so we can edit it on both explorer/designer and editor
  const [query, setQuery] = useState(defaultQuery || '');
  // Explorer/designer plugin options
  const explorerPlugin = useExplorerPlugin({
    query,
    onEdit: setQuery,
    showAttribution: true,
  });

  const props = {
    // Pass props
    ...graphiQLProps,

    // Override the passed in props
    onEditQuery: (val: string) => {
      setQuery(val);
      if (onEditQuery) {
        onEditQuery(val);
      }
    },
    fetcher: async (graphQLParams: FetcherParams, opts?: FetcherOpts) => {
      const func = fetcher ?? sortedFetcher;
      const res = await func(graphQLParams, opts);
      onQueryResponse && onQueryResponse(res);
      return res;
    },
    query,
    plugins: [explorerPlugin],
    visiblePlugin: explorerDefaultOpen ? explorerPlugin.title : '',
  };

  useEffect(() => {
    setTheme(theme);
  }, [theme]);

  return <GraphiQLPlayground {...props} />;
};
