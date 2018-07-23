const webpack = require('webpack');
const webpackServe = require('webpack-serve');
const getWebpackConfig = require('./get-webpack-config');

async function webpackServeStart(moduleName, port) {
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
}

function getServeFiles(chunks, url) {
  return chunks.map(value => {
    return `${url}/${value.files[0]}`;
  });
}

/**
 *
 * Builds and starts a Webpack Serve per hello-* module.
 *
 */
module.exports = async function build(moduleNames) {
  const buildPromises = [];

  let port = 9090;

  const modulesPorts = [];

  for (moduleName of moduleNames) {
    const p = port++;
    const server = await webpackServeStart(moduleName, p);
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
