// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Typography from '../Typography';
import styles from './Address.module.css';

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

  return (
    <div className={styles.container}>
      <Jazzicon diameter={iconSize} seed={jsNumberForAddress(address)} />
      <Typography variant={size === 'small' ? 'medium' : 'body'} className={styles[size]}>
        {truncated ? truncateAddress(address) : address}
      </Typography>
    </div>
  );
};

export default Address;
