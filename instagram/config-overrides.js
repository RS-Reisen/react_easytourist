const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  webpack: function (config, env) {
      config.output = {
        ...config.output, // copy all settings
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
      };

      config.plugins.push(new MiniCssExtractPlugin({
        filename: 'static/css/[name].css',
        // chunkFilename: `static/css/[name].chunk.js`,
        })
      )

    return config;
  }
};