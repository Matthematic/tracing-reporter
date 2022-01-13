module.exports = (api) => {
  api.cache(true);
  api.assertVersion('^7.4.4');

  const presets = [
    '@babel/preset-env',
    '@babel/preset-react'
  ];
  const plugins = [
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    ["@babel/plugin-transform-runtime",
    {
      "regenerator": true,
    }]
  ];

  return {
    "sourceMaps": "inline",
    presets,
    plugins,
    exclude: /node_modules\/(?!node-fetch)/,
  };
};
