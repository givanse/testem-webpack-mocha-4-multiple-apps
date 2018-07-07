module.exports = {
  entry: './hello-world/test/index.test.js',
  mode: 'development',
  output: {
    path: __dirname + '/hello-world/dist',
    filename: 'test-bundle.js'
  },
  node: {
      fs: 'empty'
  },
};
