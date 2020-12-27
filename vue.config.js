const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~bootstrap/scss/functions";
          @import "~bootstrap/scss/mixins";
        `
      }
    }
  },
  chainWebpack: config => {
    config.module.rules.delete('svg');
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader'
        }
      ]
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  runtimeCompiler: true
};
