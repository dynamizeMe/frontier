const { addScript, executeCommandWithReturn } = require('./util.js');
const { addApplication } = require('./create.js');
const { removeLines, modify } = require('./modifier');

const os = require('node:os');
const inserter = require('./inserter.js');

function createApp() {
    const oSys = os.platform();
    const fs = require("fs");
    const cliVersion = executeCommandWithReturn("ng version | awk 'FNR == 10 {print $3}'");
    const cliMajorVer = cliVersion.split('.')[0];
    console.log(`OS: ${oSys}!`);
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    readline.question(`Please name your remote application: `, name => {
      readline.question("What port would you like to use: ", port => {
        addApplication(name, port, false);
        addScripts(name);
        if (fs.existsSync(`projects/${name}/webpack.config.js`)) {
          const config = require(`projects/${name}/webpack.config.js`);
          console.log(config);
        }
        modify(`projects/${name}/webpack.config.js`, 28, 37, moduleFederationPluginData(name));
        readline.close();
      });
    });
}

function addScripts(name) {
    addScript('start', name);
    addScript('build', name);
    addScript('watch', name);
}

function moduleFederationPluginData(name) {
  const data =
  `new ModuleFederationPlugin({
    name: 'profile',
    library: { type: 'module', name: ${name} },
    filename: 'remoteEntry.js',
    exposes: {
      ProfileModule: './projects/${name}/src/app/app.module.ts',
    },
    shared: {
      "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
      ...sharedMappings.getDescriptors()
    },
  }),
  sharedMappings.getPlugin()`
  return data;
}

module.exports = createApp
