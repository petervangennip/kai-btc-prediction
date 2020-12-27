module.exports = () => ({
  parser: require('postcss-comment'),

  plugins: {
    'postcss-preset-env': {
      importFrom: ['./src/css/settings/media-queries.css'],

      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-query-ranges': true
      }
    },
    'postcss-nested': {}
  }
});
