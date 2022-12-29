const { addApplication, addScript, changeDir, executeCommand } = require('./common.js');
const { execSync } = require('node:child_process');
const createApp = require('./add_remote.js');
const os = require('node:os');
const oSys = os.platform();
const cliVersion = executeCommand("ng version | awk 'FNR == 10 {print $3}'");
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
                createWorkspace(name);
                addApplication(appName, port);
                inquirer.close();
            });
        });
    });

    inquirer.on("close", function() {
        process.exit(0);
    });
}

function createWorkspace(name) {
    if(oSys === 'win32') {
        execSync(`ng new ${name} --createApplication="false" --directory ./`);
    }
    if(oSys === 'linux') {
        execSync(`ng new ${name} --create-application=false --directory ./`);
    }
    // changeDir(name);
    execSync(`npm i --save --save-dev ngx-build-plus@^${cliMajorVer}`);
}

module.exports = {
    setup,
    createApp
}