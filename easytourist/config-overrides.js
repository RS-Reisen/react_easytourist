// config-overrides.js
module.exports = {
  webpack: function(config, env) {
    // if (env === "production") {
      
      config.output = {
        ...config.output, // copy all settings
        filename: "static/js/[name].js",
        chunkFilename: "static/js/[name].chunk.js",
      };

    // }

    return config;
  }
};