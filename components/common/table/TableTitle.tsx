// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { Typography } from '../typography';
interface TableTitleProps {
  title?: string;
  className?: string;
  tooltip?: string;
  noTooltipIcon?: boolean;
  children?: string | React.ReactNode;
}

export const TableTitle: React.FC<TableTitleProps> = ({
  title,
  children: childrenArg,
  tooltip,
  noTooltipIcon,
  ...props
}) => {
  const children = childrenArg && typeof childrenArg === 'string' ? childrenArg.toUpperCase() : childrenArg;
  const content = title && title.toUpperCase();
  return (
    <Typography type="secondary" variant="small" weight={600}>
      {content || children}
    </Typography>
  );
};
