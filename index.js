const { addScript, executeCommandWithReturn } = require('./utils/util.js'); 
const { addApplication, createAddFile } = require('./utils/create.js');

const { execSync } = require('node:child_process');
const createApp = require('./utils/add_remote.js');
const os = require('node:os');

const oSys = os.platform();
const cliVersion = executeCommandWithReturn("ng version | awk 'FNR == 10 {print $3}'");
const cliMajorVer = cliVersion.split('.')[0];

function setup() {
    console.log(`Detected OS: ${oSys}!`);
    initalizeWorkspace();
}

function initalizeWorkspace() {
    const readline = require('readline');
    const inquirer = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    inquirer.question("Please name the micro frontend project: ", name => {
        inquirer.question("Please name you shell application: ", appName => {
            inquirer.question("What port would you like to use: ", port => {
                execSync(`ng new ${name.trim()} --create-application=false --directory ./`);
                execSync(`npm i --save --save-dev ngx-build-plus@^${cliMajorVer}`);
                addApplication(appName.trim(), port.trim(), true, createAddFile());
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

createInitScript();

module.exports = {
    setup,
    createApp
}