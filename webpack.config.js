/* eslint-disable no-unused-vars */
const merge = require('webpack-merge');
const defaultWebpackConfig = require('terra-dev-site/config/webpack/webpack.config');

const appWebpackConfig = () => ({
  resolve: {
    alias: {
    },
  },
  plugins: [
  ],
  module: {},
});

const mergedConfig = (env, argv) => (
  merge(defaultWebpackConfig(env, argv), appWebpackConfig(env, argv))
);

module.exports = mergedConfig;
