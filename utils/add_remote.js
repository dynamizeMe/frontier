'use strict'
import fs from "fs";
import inquirer from 'inquirer';
import { addApplication } from './create.js';
import { cwd } from 'node:process';
import { questions } from '../inquirer/add_application_questions.js';
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export function createApp() {
  inquirer.prompt(questions).then((answers) => {
    addApplication(answers.appName, answers.port, true);
    addEntryToManifest(answers.appName, answers.port);
  })
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
