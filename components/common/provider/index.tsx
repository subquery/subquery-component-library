// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createContext } from 'react';

export interface ProviderProps {
  theme?: 'light' | 'dark';
}

export const Context = createContext<ProviderProps>({
  theme: 'light',
});

const Provider: React.FC<ProviderProps & { children: React.ReactNode }> = ({ theme = 'light', children }) => {
  return (
    <Context.Provider
      value={{
        theme,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
