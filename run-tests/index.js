const Testem = require('testem');
const build = require('./build');
const getTestemConfig = require('./get-testem-config');

async function start(moduleNames) {
  const testem = new Testem();
  const testemConfig = getTestemConfig(moduleNames);

  return new Promise(function(resolve) {
    console.log(`Testem CWD: \`${testemConfig.cwd}\``);
    testem.startCI(testemConfig, resolve);
    //testem.startDev(testemConfig, resolve);
  });
}

const moduleNames = ['hello-world', 'hello-star'];

start(moduleNames)
.then(() => {
  process.exit(0);
});
