// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useMemo } from 'react';
import { useSize } from 'ahooks';

export const useIsMobile = (initialRenderMode: 'desktop' | 'mobile' = 'desktop') => {
  const size = useSize(typeof window !== 'undefined' ? document?.body : null);
  const isMobile = useMemo(
    () => (typeof window === 'undefined' ? initialRenderMode : (size?.width || 9999) < 768),
    [size?.width, initialRenderMode],
  );

  return isMobile;
};
