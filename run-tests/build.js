const webpack = require('webpack');
const webpackServe = require('webpack-serve');

const WORKSPACE_ROOT = `${__dirname}/..`;

function getWebpackConfig(moduleName) {
  const webpackConfig = require('./configs/webpack.config.js');

  webpackConfig.context = `${WORKSPACE_ROOT}/${moduleName}`;
  webpackConfig.entry = [`${WORKSPACE_ROOT}/${moduleName}/test/index.js`];
  webpackConfig.output.path = `${WORKSPACE_ROOT}/${moduleName}/dist`;

  return webpackConfig;
}

async function compileWatch(moduleName, port) {
  const webpackConfig = getWebpackConfig(moduleName);
  const compiler = webpack(webpackConfig);

  const argv = {};
  const options = {
    compiler,
    clipboard: false,
    devMiddleware: {
      logLevel: 'debug',
      stats: 'minimal',
      watchOptions: {
        aggregateTimeout: 300
      },
    },
    port: port,
  };

  return webpackServe(argv, options);

  /*
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
  */
}

function getServeFiles(chunks, url) {
  return chunks.map(value => {
    return `${url}/${value.files[0]}`;
  });
}

module.exports = async function build(moduleNames) {
  const buildPromises = [];

  let port = 9090;

  const modulesPorts = [];

  for (moduleName of moduleNames) {
    const p = port++;
    const server = await compileWatch(moduleName, p);
    modulesPorts.push({moduleName, port: p});

    const initialBuildFinished = new Promise(function(resolve) {

      let initialBuildDone = function({stats/*, compiler*/}) {
        const url = `http://localhost:${p}`;
        const serveFiles = getServeFiles(stats.compilation.chunks, url);

        console.log(`Initial build done: ${moduleName} available at ${url}`);
        console.log(`Serving:`);
        console.log(serveFiles);

        resolve(serveFiles);

        initialBuildDone = () => {}; //TODO: how to unregister a listener?
      };
      server.on('build-finished', initialBuildDone);
    });

    buildPromises.push(initialBuildFinished);
  }

  const results = await Promise.all(buildPromises);
  return {
    modulesPorts: modulesPorts,
    bundlesUrls: [].concat(...results),
  }
}
