const Testem = require('testem');
const build = require('./build');
const getTestemConfig = require('./get-testem-config');

async function start(moduleNames) {
  const result = await build(moduleNames);

  const testemConfig = getTestemConfig(result.modulesPorts);

  testemConfig.serve_files = result.bundlesUrls;

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
