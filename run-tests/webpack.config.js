const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const WORKSPACE_ROOT = path.resolve(`${__dirname}/..`);

module.exports = {
  entry: null, // set programatically 
  mode: 'development',
  node: {
      fs: 'empty'
  },
  output: {
    filename: '[name]/[name].bundle.js',
    path: WORKSPACE_ROOT,
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      },
    },
  },
  /*plugins: [
    new BundleAnalyzerPlugin()
  ]*/
};
