const testemConfig = require('./testem.config.js');
const NyanReporter = require('testem-nyan-reporter');
const path = require('path');


module.exports = function getTestemConfig(moduleNames, bundlesURLs) {

  testemConfig.serve_files = bundlesURLs;

  const names = moduleNames.join(',');

  // relative path to the Testem server root
  testemConfig.test_page = `run-tests/test.html?moduleNames=${names}`;

  testemConfig.reporter = new NyanReporter();

  return testemConfig;
}
