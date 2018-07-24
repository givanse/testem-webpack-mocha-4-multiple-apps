const webpack = require('webpack');
const getWebpackConfig = require('./get-webpack-config');

const moduleNames = ['hello-world', 'hello-star'];

const webpackConfig = getWebpackConfig(moduleNames);

function runCb(err, stats) {
  if (err) {
    throw err;
  } 

  const str = stats.toString({
    colors: true,
    errors: true,
  });
  console.log(str);
}

const compiler = webpack(webpackConfig);

compiler.run(runCb);
