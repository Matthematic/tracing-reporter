/* eslint-disable import/no-extraneous-dependencies */
//require("@babel/register");
const wdioConf = require('@cerner/terra-functional-testing/lib/config/wdio.conf.js');
const webpackConfig = require('./webpack.config');

const config = {
  ...wdioConf.config,

  webpackConfig,

  mochaOpts: {
    compilers: ['js:@babel/register'],
    timeout: 25000,
  },
  serviceOptions: {
    selector: '#root', // Global selector for Terra
  },
};

exports.config = config;
