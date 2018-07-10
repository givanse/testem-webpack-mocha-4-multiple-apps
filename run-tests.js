const webpack = require('webpack');
const Testem = require('testem');

function getWebpackConfig(moduleName) {
  const webpackConfig = require('./configs/webpack.config.js');

  webpackConfig.context = `${__dirname}/${moduleName}`;
  webpackConfig.entry = `${__dirname}/${moduleName}/test/index.js`;
  webpackConfig.output.path = `${__dirname}/${moduleName}/dist`;

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

function addModuleToTestemConfig(moduleName, testemConfig) {
  testemConfig.serve_files = testemConfig.serve_files || [];
  testemConfig.test_page = testemConfig.test_page || [];

  testemConfig.serve_files.push(`./${moduleName}/dist/test-bundle.js`);
  testemConfig.test_page.push(`./test.html?name=${moduleName}`);

  return testemConfig;
}

async function prepModules(moduleNames) {
  const testemConfig = require('./configs/testem.config.js');

  const compilePromises = [];

  for (moduleName of moduleNames) {
    const webpackConfig = getWebpackConfig(moduleName);
    compilePromises.push(compileWatch(webpackConfig));
    addModuleToTestemConfig(moduleName, testemConfig);
  }

  return Promise.all(compilePromises).then(() => testemConfig);
}

async function startCI(moduleNames) {
  const t = new Testem();
  const testemConfig = await prepModules(moduleNames);

  return new Promise(function(resolve) {
    t.startCI(testemConfig, resolve);
  });
}

const moduleNames = ['hello-world', 'hello-star'];

startCI(moduleNames)
.then(() => {
  process.exit(0);
});
