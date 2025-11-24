module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      '@babel/preset-flow', // Transform Flow type syntax
      [
        'babel-preset-expo',
        {
          // Don't transform modules for Vitest
          disableImportExportTransform: true,
        },
      ],
    ],
  };
};
