const testFiles = require.context('.', true, /\.test\.js$/);
testFiles.keys().forEach(testFiles);
