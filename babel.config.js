module.exports = (api) => {
  api.cache(true);
  api.assertVersion('^7.4.4');

  const presets = [
    '@babel/preset-env',
    ["@babel/preset-react", {
      pragma: "React.createElement",
    }],
  ];
  const plugins = [
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-regenerator',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
  ];

  return {
    presets,
    plugins,
  };
};
