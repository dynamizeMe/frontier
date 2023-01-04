const { addScript } = require('./util.js');
const { addApplication } = require('./create.js');
const { cwd } = require('node:process');
const os = require('node:os');

function createApp() {
    const oSys = os.platform();

    console.log(`OS: ${oSys}!`);
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    readline.question(`Please name your remote application: `, name => {
      readline.question("What port would you like to use: ", port => {
        addApplication(name, port, false);
        addEntryToManifest(name, port);
        readline.close();
      });
    });
}


function getHost() {
  const angJsonPath = `${cwd()}/angular.json`;
  const json = require(angJsonPath);
  const hostApp = Object.keys(json.projects)[0];
  return hostApp;
}

function addEntryToManifest(name, port) {
  const saveFile = require('fs').writeFileSync;
  const manifestPath = `${cwd()}/projects/${getHost()}/src/assets/mf.manifest.json`;
  const json = require(manifestPath);

  if(json.hasOwnProperty('mfe1')) {
    delete json['mfe1'];
  }

  let key = name;
  let value = {
    route: name,
    remoteEntry: `http://localhost:${port}/remoteEntry.js`,
    exposedModule: './Routes',
    routeConfigName: 'routes'
  };
  json[key] = value;

  saveFile(manifestPath, JSON.stringify(json, null, 2));
}

module.exports = createApp
