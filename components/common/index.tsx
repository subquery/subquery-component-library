// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ConfigProvider } from 'antd';

// TODO: COLORS util
ConfigProvider.config({
  theme: {
    primaryColor: '#4388dd',
  },
});

export { default as Address } from './address';
export { default as Alert } from './alert';
export { default as Button, AntdButton } from './button';
export { default as Dialog } from './dialog';
export { default as Dropdown } from './dropdown';
export { default as Modal } from './modal';
export { default as ProgressBar } from './progressBar';
export { default as Spinner } from './spinner';
export * from './table';
export { default as Tag } from './tag';
export { default as TextInput } from './textInput';
export { default as Toast } from './toast';
export * from './typography';
