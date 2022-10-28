// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Typography } from '../typography';

export interface TableTitleProps {
  title?: string;
  className?: string;
  tooltip?: string;
  // tooltipIcon?: boolean;
  children?: string | React.ReactNode;
}

export const TableTitle: React.FC<TableTitleProps> = ({ title, children: childrenArg, tooltip, ...props }) => {
  const children = childrenArg && typeof childrenArg === 'string' ? childrenArg.toUpperCase() : childrenArg;
  const content = title && title.toUpperCase();
  return (
    <Typography type="secondary" variant="small" weight={600} tooltip={tooltip}>
      {content || children}
    </Typography>
  );
};
