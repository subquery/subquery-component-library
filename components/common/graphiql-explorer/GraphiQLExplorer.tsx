// Copyright 2020-2023 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import 'graphiql/graphiql.css';
import '@graphiql/plugin-explorer/dist/style.css';

import { useExplorerPlugin } from '@graphiql/plugin-explorer';
import { GraphiQL } from 'graphiql';
import { useMemo, useState } from 'react';

import { IGraphiQL, createSortedFetcher } from '../GraphiQL';

export interface IGraphiQLExplorerProps extends IGraphiQL {
  explorerOpen?: boolean;
}

export const GraphiQLExplorer: React.FC<IGraphiQLExplorerProps> = ({
  defaultQuery,
  fetcher,
  bearToken,
  url,
  explorerOpen,
}) => {
  const [query, setQuery] = useState(defaultQuery || '');

  const customFetcher = useMemo(() => {
    return createSortedFetcher({ bearToken, url });
  }, [bearToken, url]);

  const explorerPlugin = useExplorerPlugin({
    query,
    onEdit: setQuery,
    showAttribution: true,
  });

  return (
    <GraphiQL
      fetcher={fetcher ?? customFetcher}
      query={query}
      onEditQuery={setQuery}
      plugins={[explorerPlugin]}
      visiblePlugin={explorerOpen ? explorerPlugin.title : ''}
    />
  );
};
