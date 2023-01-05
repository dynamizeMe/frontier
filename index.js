#!/usr/bin/env node
import { addScript, executeCommandWithReturn } from './utils/util.js';
import { addApplication } from './utils/create.js';
import { execSync } from 'node:child_process';
import { createApp } from './utils/add_remote.js';
import { clearConsole } from './utils/console.js';
import readline  from 'readline';
import os from 'node:os';

const oSys = os.platform();
const cliVersion = executeCommandWithReturn("ng version | awk 'FNR == 10 {print $3}'");
const cliMajorVer = cliVersion.split('.')[0];

clearConsole();

function execute() {
  if(process.argv[2] === '--init') {
      initalizeWorkspace();
  }
  else if(process.argv[2] === '--add') {
      createApp();
  }
  else {
      console.log('Invalid arguments.');
  }
}

function initalizeWorkspace() {
    clearConsole();
    const inquirer = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    inquirer.question("Please name the micro frontend project: ", name => {
      inquirer.question("Please name you shell application: ", appName => {
        inquirer.question("What port would you like to use: ", port => {
          execSync(`ng new ${name.trim()} --create-application=false --directory ./`);
          execSync(`npm i --save --save-dev ngx-build-plus@^${cliMajorVer}`);
          addScript('add');
          addApplication(appName.trim(), port.trim(), true);
          inquirer.close();
        });
      });
    });
    inquirer.on("close", function() {
        process.exit(0);
    });
}

function createInitScript() {
    addScript('init');
}

execute();
