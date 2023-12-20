// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as React from 'react';
import styles from './Spinner.module.css';

type Props = {
  size?: number;
  color?: string;
  className?: number;
};

const Spinner: React.FC<Props> = ({ size, color, className }) => {
  const style =
    size || color
      ? {
          height: size,
          width: size,
          borderColor: color,
          borderRightColor: 'transparent',
        }
      : undefined;

  return <div className={[styles.spinnerBorder, className].join(' ')} style={style} />;
};

export default Spinner;
