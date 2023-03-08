module.exports = {
  stories: [
    '../docs/**/*.stories.mdx',
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-css-modules-preset',
    'storybook-addon-designs',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react',
  staticDirs: ['../public'],
};
