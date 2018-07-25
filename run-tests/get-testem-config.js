const testemConfig = require('./testem.config.js');
const NyanReporter = require('testem-nyan-reporter');
const path = require('path');

// This is now ridiculous and `test.html` should have templating
function getModulesNames(bundlesURLs) {
  const moduleNames = [];
  for (const url of bundlesURLs) {
    const name = url.match(/\/([\w-.]*).js$/)[1];
    moduleNames.push(name);
  }
  return moduleNames;
}

module.exports = function getTestemConfig(bundlesURLs) {

  testemConfig.serve_files = bundlesURLs;

  const moduleNames = getModulesNames(bundlesURLs);

  // relative path to the Testem server root
  testemConfig.test_page = `run-tests/test.html?moduleNames=${moduleNames}`;

  testemConfig.reporter = new NyanReporter();

  return testemConfig;
}
