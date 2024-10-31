// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createContext, useEffect } from 'react';

export interface ProviderProps {
  theme?: 'light' | 'dark';
  version?: 'v2' | 'v3';
}

export const Context = createContext<ProviderProps>({
  theme: 'light',
  version: 'v3',
});

const Provider: React.FC<ProviderProps & { children: React.ReactNode }> = ({ theme = 'light', version, children }) => {
  useEffect(() => {
    if (version === 'v2') {
      if (!document.body.classList.contains('v2')) {
        document.body.classList.add('v2');
      }
    }
  }, [version]);
  return (
    <Context.Provider
      value={{
        theme,
        version,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
