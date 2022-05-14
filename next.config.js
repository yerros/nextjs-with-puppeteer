const path = require("path");

module.exports = {
  env: {
    BROWSERLESS: "ws://54.167.65.169:3000"
  },
  webpack(config, options) {
    config.resolve.alias["server"] = path.join(__dirname, "server");
    return config;
  }
};
