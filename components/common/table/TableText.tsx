// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Typography } from '../typography';

interface TableTextprops {
  content?: string | number | React.ReactNode;
  className?: string;
  tooltip?: string;
  children?: string | number | React.ReactNode;
}

export const TableText: React.FC<TableTextprops> = ({ content, children }) => {
  return <Typography variant="medium">{content || children}</Typography>;
};
