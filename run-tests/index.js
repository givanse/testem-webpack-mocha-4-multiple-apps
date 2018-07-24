const Testem = require('testem');
const webpackServeStart = require('./webpack-serve-start');
const getTestemConfig = require('./get-testem-config');

async function start(moduleNames) {
  const bundlesURLs = await webpackServeStart(moduleNames);

  const testemConfig = getTestemConfig(moduleNames, bundlesURLs);

  return new Promise(function(resolve) {
    console.log(`Testem CWD: \`${testemConfig.cwd}\``);
    const testem = new Testem();
    testem.startCI(testemConfig, resolve);
    //testem.startDev(testemConfig, resolve);
  });
}

const moduleNames = ['hello-world', 'hello-star'];

start(moduleNames)
.then(() => {
  process.exit(0);
});
