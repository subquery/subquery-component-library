// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL as GraphiQLPlayground, GraphiQLProps } from 'graphiql';
import { useExplorerPlugin } from '@graphiql/plugin-explorer';

import 'graphiql/graphiql.min.css';
import '@graphiql/plugin-explorer/dist/style.css';
import './GraphiQL.module.css';
import { useMemo, useState } from 'react';

export interface IGraphiQL extends GraphiQLProps {
  bearToken?: string;
  url: string;
  explorerDefaultOpen?: boolean;
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
  ...graphiQLProps
}) => {
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
    fetcher: fetcher ?? sortedFetcher,
    query,
    plugins: [explorerPlugin],
    visiblePlugin: explorerDefaultOpen ? explorerPlugin.title : '',
  };

  return <GraphiQLPlayground {...props} />;
};
