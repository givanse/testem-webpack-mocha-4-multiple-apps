const webpack = require('webpack');
const Testem = require('testem');

const WORKSPACE_ROOT = `${__dirname}/..`;

/**
 * Functions 
 */

function getWebpackConfig(moduleName) {
  const webpackConfig = require('./configs/webpack.config.js');

  webpackConfig.context = `${WORKSPACE_ROOT}/${moduleName}`;
  webpackConfig.entry = `${WORKSPACE_ROOT}/${moduleName}/test/index.js`;
  webpackConfig.output.path = `${WORKSPACE_ROOT}/${moduleName}/dist`;

  return webpackConfig;
}

async function compileWatch(webpackConfig) {
  const compiler = webpack(webpackConfig);
  return new Promise(function(resolve, reject) {
    compiler.watch({}, function(err, stats) {
      if (err) {
        reject(err);
      }

      for (const w of stats.compilation.warnings) {
        console.log();
        console.log(`${w.module.id} (${w.loc.start.line}, ${w.loc.start.column}) - (${w.loc.end.line}, ${w.loc.end.column})`);
        console.log(`${w.name} ${w.error.message}`);
      }

      for (const e of stats.compilation.errors) {
        console.log(e);
      }

      if (stats.compilation.errors.length) {
        process.exit(1);
      }

      resolve();
    });
  });
}

function addModuleInfoToTestemConfig(moduleName, testemConfig) {
  testemConfig.serve_files = testemConfig.serve_files || [];
  testemConfig.test_page = testemConfig.test_page || [];

  testemConfig.serve_files.push(`${moduleName}/dist/test-bundle.js`);
  testemConfig.test_page.push(`run-tests/test.html?name=${moduleName}`);

  return testemConfig;
}

async function prepModules(moduleNames) {
  const testemConfig = require('./configs/testem.config.js');

  const compilePromises = [];

  for (moduleName of moduleNames) {
    const webpackConfig = getWebpackConfig(moduleName);
    compilePromises.push(compileWatch(webpackConfig));
    addModuleInfoToTestemConfig(moduleName, testemConfig);
  }

  return Promise.all(compilePromises).then(() => testemConfig);
}

async function start(moduleNames) {
  const testem = new Testem();
  const testemConfig = await prepModules(moduleNames);

  return new Promise(function(resolve) {
    console.log(`Testem CWD: \`${testemConfig.cwd}\``);
    testem.startCI(testemConfig, resolve);
    //testem.startDev(testemConfig, resolve);
  });
}

const moduleNames = ['hello-world', 'hello-star'];

start(moduleNames)
.then(() => {
  process.exit(0);
});
