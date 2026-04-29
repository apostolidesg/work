module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: false,
        useBuiltIns: 'usage',
        corejs: 3,
        targets: { esmodules: true },
      },
    ],
  ],
  sourceType: 'unambiguous',
  plugins: [
    '@babel/plugin-transform-optional-chaining',
    // Stage 2
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    // Stage 3
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-class-properties',
    '@babel/plugin-transform-object-rest-spread',
  ],
};
