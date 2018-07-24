const path = require('path');
const WORKSPACE_ROOT = path.resolve(`${__dirname}/..`);

const WEBPACK_CONFIG = require('./webpack.config.js');

function addModuleConfig(moduleName) {
  const entryPath = path.resolve(`${WORKSPACE_ROOT}/${moduleName}/test/index.js`);
  WEBPACK_CONFIG.entry[moduleName] = entryPath;
}

module.exports = function build(moduleNames) {

  WEBPACK_CONFIG.context = WORKSPACE_ROOT;
  WEBPACK_CONFIG.entry = {};
  WEBPACK_CONFIG.output.path = `${WORKSPACE_ROOT}/dist`;

  for (moduleName of moduleNames) {
    addModuleConfig(moduleName);
  }

  return WEBPACK_CONFIG;
}
