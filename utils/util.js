'use strict'
import fs from 'fs';
import { execSync } from 'node:child_process';
import { chdir, cwd } from 'node:process';
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export function executeCommandWithReturn(command) {
    return execSync(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        return stdout;
    }).toString();
}

export function executeCommand(command) {
    execSync(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    });
}

export function changeDir(dir) {
    try {
        if(dir.startsWith('../')) {
            chdir(`${dir}`);
        }
        else {
            chdir(`${cwd()}${dir}`);
        }
    } catch (err) {
        console.error(`chdir: ${err}`);
    }
}

export function addScript(type, name) {
  const pkgJsonPath = `${cwd()}/package.json`;
  const json = require(pkgJsonPath);
  let key = '';
  let value = '';
  switch(type) {
    case 'add':
      key = 'add:remote';
      value = 'npx micros-frontier --add'
      break;
    case 'start':
      key = 'start:' + name;
      value = 'ng serve ' + name;
      break;
    case 'build':
      key = 'build:' + name;
      value = 'bg build ' + name;
      break;
    case 'watch':
      key = 'watch:' + name;
      value = 'bg build ' + name + ' --watch --configuration development';
      break;
    case 'init':
      key = 'init:frontier';
      value = 'node node_modules/micros-frontier/execute.js --init';
      break;
    case 'host':
      key = 'init:frontier';
      value = 'node node_modules/micros-frontier/execute.js --init';
      break;
    default:
      break;
    }

    if (!json.hasOwnProperty('scripts')) {
        json.scripts = {};
    }

    json.scripts[key] = value;

    fs.writeFileSync(pkgJsonPath, JSON.stringify(json, null, 2));
}

export function addExport(name) {
  const pkgJsonPath = `${cwd()}/package.json`;
  console.log(`Path: ${pkgJsonPath}`);
  const json = require(pkgJsonPath);
  if (!json.hasOwnProperty('exports')) {
    json.exports = {};
  }
  json.exports[`./projects*`] = `./projects/*/webpack.config.js`;
  fs.writeFileSync(pkgJsonPath, JSON.stringify(json, null, 2));
}
