// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';
import { createBEM } from './createBem';

export const useBem = (bemName: string) => {
  const bem = useMemo(() => createBEM(bemName), [bemName]);
  return bem;
};
