import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',

  colorSecondary: '#ff4581',

  appBg: '#252525f7',
  appBorderColor: 'rgba(0,0,0,.1)',
  appBorderRadius: 4,

  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  textColor: '#999999',
  textMutedColor: '#666666',

  brandTitle: 'subquery-components',
  brandImage: '/logo-light.svg',
});

addons.setConfig({
  theme,
  showRoots: true,
});
