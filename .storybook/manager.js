import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

import logo from '../assets/logo.svg';

const theme = create({
  base: 'light',

  colorPrimary: '#4388dd',
  colorSecondary: '#ff4581',

  appBg: '#F6F9FC',
  appContentBg: '#FFFFFF',
  appBorderColor: 'rgba(0,0,0,.1)',
  appBorderRadius: 4,

  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  textColor: '#333333',
  textMutedColor: '#666666',

  barTextColor: '#999999',
  barSelectedColor: '#4388dd',
  barBg: '#FFFFFF',

  brandTitle: 'subquery-components',
  brandImage: logo,
});

addons.setConfig({
  theme,
  showRoots: true,
});
