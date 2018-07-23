const WORKSPACE_ROOT = `${__dirname}/..`;

module.exports = function getWebpackConfig(moduleName) {
  const webpackConfig = require('./webpack.config.js');

  webpackConfig.context = `${WORKSPACE_ROOT}/${moduleName}`;
  webpackConfig.entry = [`${WORKSPACE_ROOT}/${moduleName}/test/index.js`];
  webpackConfig.output.path = `${WORKSPACE_ROOT}/${moduleName}/dist`;

  return webpackConfig;
}
