
const WORKSPACE_ROOT = `${__dirname}/..`;

function getWebpackConfig(moduleName) {
  const webpackConfig = require('./configs/webpack.config.js');

  webpackConfig.context = `${WORKSPACE_ROOT}/${moduleName}`;
  webpackConfig.entry = `${WORKSPACE_ROOT}/${moduleName}/test/index.js`;
  webpackConfig.output.path = `${WORKSPACE_ROOT}/${moduleName}/dist`;

  return webpackConfig;
}

async function compileWatch(moduleName) {
  const webpackConfig = getWebpackConfig(moduleName);
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

module.exports = async function build(moduleNames) {
  const buildPromises = [];

  for (moduleName of moduleNames) {
    buildPromises.push(build(moduleName));
  }

  return Promise.all(buildPromises);
}
