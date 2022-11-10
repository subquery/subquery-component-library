// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import './antd.css';
import { ConfigProvider } from 'antd';
import { COLORS } from '../utilities';

ConfigProvider.config({
  theme: {
    primaryColor: COLORS.primary,
    successColor: COLORS.success,
    warningColor: COLORS.warning,
    errorColor: COLORS.error,
    infoColor: COLORS.info,
  },
});

export { default as Address } from './address';
export { default as Alert } from './alert';
export { default as Button, AntdButton } from './button';
export { default as Dialog } from './dialog';
export * from './dropdown';
export * from './modal';
export * from './progressBar';
export { default as Spinner } from './spinner';
export * from './table';
export * from './tabs';
export * from './tag';
export { default as TextInput } from './textInput';
export { default as Toast } from './toast';
export * from './typography';
export * from './notification';
