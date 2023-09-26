// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import { toSvg } from 'jdenticon';
import { Typography } from '../typography';
import { createBEM } from 'components/utilities/createBem';
import clsx from 'clsx';
import './Addres.less';

export function truncateAddress(address: string): string {
  if (!address) {
    return address;
  }
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

type Props = {
  address: string;
  truncated?: boolean;
  size?: 'small' | 'large';
};

const Address: React.FC<Props> = ({ address, truncated = true, size = 'small' }) => {
  const iconSize = React.useMemo(() => {
    switch (size) {
      case 'small':
        return 18;
      case 'large':
      default:
        return 32;
    }
  }, [size]);
  const bem = createBEM('subql-address');

  return (
    <div className={clsx(bem())}>
      <img
        className={clsx(bem('icon'))}
        src={`data:image/svg+xml;utf8,${encodeURIComponent(toSvg(address, iconSize))}`}
        alt=""
      />
      <Typography variant={size === 'small' ? 'medium' : 'text'} className={clsx(bem('text', size))} type="secondary">
        {truncated ? truncateAddress(address) : address}
      </Typography>
    </div>
  );
};

export default Address;
