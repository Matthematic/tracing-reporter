/* eslint-disable import/no-extraneous-dependencies */
const wdioConf = require('./node_modules/terra-toolkit/config/wdio/wdio.conf.js');
const webpackConfig = require('./webpack.config');

const config = {
  ...wdioConf.config,

  webpackConfig,

  mochaOpts: {
    compilers: ['js:@babel/register'],
    timeout: 25000,
  },
  reporters: ['dot', 'spec'],
  terra: {
    selector: '#root', // Global selector required for Terra.it.matchesScreenshot()
  },
};

exports.config = config;
