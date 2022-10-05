import '!style-loader!css-loader!../components/styles.css';

export const parameters = {
  viewMode: 'story',
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
