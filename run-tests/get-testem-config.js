const testemConfig = require('./testem.config.js');
const NyanReporter = require('testem-nyan-reporter');

testemConfig.serve_files = testemConfig.serve_files || [];
testemConfig.test_page = testemConfig.test_page || [];

module.exports = function getTestemConfig(modulesPorts) {

  for (const {moduleName, port} of modulesPorts) {
    testemConfig.serve_files.push(`${moduleName}/dist/test-bundle.js`);
    testemConfig.test_page.push(`run-tests/test.html?name=${moduleName}&port=${port}`);
  }

  testemConfig.reporter = new NyanReporter();

  return testemConfig;
}
