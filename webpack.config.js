module.exports = {
  entry: './hello-world/test/index.test.js',
  mode: 'development',
  node: {
      fs: 'empty'
  },
  output: {
    path: __dirname + '/hello-world/dist',
    filename: 'test-bundle.js'
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
