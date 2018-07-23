module.exports = {
  entry: null, // set programatically 
  mode: 'development',
  node: {
      fs: 'empty'
  },
  output: {
    path: null, // set programatically 
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
