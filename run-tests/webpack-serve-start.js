const webpack = require('webpack');
const webpackServe = require('webpack-serve');
const getWebpackConfig = require('./get-webpack-config');

async function webpackServeStart(moduleNames, port) {
  const webpackConfig = getWebpackConfig(moduleNames);
  //const compiler = webpack(webpackConfig);

  const argv = {};
  const options = {
    //compiler,
    config: webpackConfig,
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

function listenForInitialBuild(server) {
  const serverUrl = `http://${server.options.host}:${server.options.port}`;
  return new Promise(function(resolve) {

    let initialBuildDone = function({stats/*, compiler*/}) {
      const serveFiles = getServeFiles(stats.compilation.chunks, serverUrl);

      console.log(`Initial build done, server available at ${serverUrl}`);
      console.log(`Serving:`);
      console.log(serveFiles);

      resolve(serveFiles);

      initialBuildDone = () => {}; //TODO: how to unregister a listener?
    };
    server.on('build-finished', initialBuildDone);
  });
}

/**
 *
 * Builds and starts a single Webpack Serve for all the hello-* modules.
 *
 */
module.exports = async function build(moduleNames) {
  const buildPromises = [];

  const port = 9090;
  const serverUrl = `http://localhost:${port}`;

  const server = await webpackServeStart(moduleNames, port);

  const serveFiles = await listenForInitialBuild(server);

  return serveFiles;
}
