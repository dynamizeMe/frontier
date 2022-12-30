const { addScript, executeCommand } = require('./util.js');
const { addApplication } = require('./create.js');
const os = require('node:os');

function createApp() {
    const oSys = os.platform();
    const cliVersion = executeCommand("ng version | awk 'FNR == 10 {print $3}'");
    const cliMajorVer = cliVersion.split('.')[0];
    console.log(`OS: ${oSys}!`);
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    readline.question(`Please name your remote application: `, name => {
        addApplication(name, cliMajorVer, false);
        addScripts(name);
        readline.close();
    });
}

function addScripts(name) {
    addScript('start', name);
    addScript('build', name);
}

module.exports = createApp