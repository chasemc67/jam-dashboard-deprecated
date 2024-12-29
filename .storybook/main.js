module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-create-react-app',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async config => {
    // Convert ESLint errors to warnings
    config.module.rules.forEach(rule => {
      if (
        rule.use &&
        rule.use.some(use => use.loader && use.loader.includes('eslint-loader'))
      ) {
        rule.use.forEach(use => {
          if (use.options) {
            use.options.emitWarning = true;
            use.options.emitError = false;
          }
        });
      }
    });
    return config;
  },
};
