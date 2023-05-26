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
  staticDirs: ['../assets'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.less$/,
      use: [
        'style-loader',
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
          },
        },
        'less-loader',
      ],
      include: require('path').resolve(__dirname, '../components'),
    });

    return config;
  },
};
