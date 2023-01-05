import { addApplication } from './create.js';
import { cwd } from 'node:process';
import os from 'node:os';
import fs from "fs";
import readline  from 'readline';
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export function createApp() {
    const oSys = os.platform();

    console.log(`OS: ${oSys}!`);
    const inquirer = readline.createInterface({
      input: process.stdin,
      output: process.stdout
  });
  inquirer.question(`Please name your remote application: `, name => {
    inquirer.question("What port would you like to use: ", port => {
      addApplication(name, port, false);
      addEntryToManifest(name, port);
      inquirer.close();
    });
  });
};


export function getHost() {
  const angJsonPath = `${cwd()}/angular.json`;
  const json = require(angJsonPath);
  const hostApp = Object.keys(json.projects)[0];
  return hostApp;
};

export function addEntryToManifest(name, port) {
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

  fs.writeFileSync(manifestPath, JSON.stringify(json, null, 2));
};
