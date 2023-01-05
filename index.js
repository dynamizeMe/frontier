#!/usr/bin/env node
'use strict'
import inquirer from 'inquirer';
import { addScript, executeCommandWithReturn } from './utils/util.js';
import { addApplication } from './utils/create.js';
import { execSync } from 'node:child_process';
import { createApp } from './utils/add_remote.js';
import { clearConsole } from './utils/console.js';
import { questions } from './inquirer/init_questions.js';

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
    inquirer.prompt(questions).then((answers) => {
      execSync(`ng new ${answers.workspaceName} --create-application=false --directory ./`);
      execSync(`npm i --save --save-dev ngx-build-plus@^${cliMajorVer}`);
      addScript('add');
      addApplication(answers.appName, answers.port, true);
    });
}

execute();
