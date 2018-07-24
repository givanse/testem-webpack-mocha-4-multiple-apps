const path = require('path');

const WORKSPACE_ROOT = path.resolve(`${__dirname}/..`);

module.exports = {
  entry: null, // set programatically 
  mode: 'development',
  node: {
      fs: 'empty'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(`${WORKSPACE_ROOT}/dist`),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
};
