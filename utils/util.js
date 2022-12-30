const { execSync } = require('node:child_process');
const { chdir, cwd } = require('node:process');

function executeCommandWithReturn(command) {
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

function executeCommand(command) {
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

function changeDir(dir) {
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

function addScript(type, name) {
    const saveFile = require('fs').writeFileSync;
    const pkgJsonPath = require.main.paths[0].split('node_modules')[0] + 'package.json';
    const json = require(pkgJsonPath);
    let key = '';
    let value = '';
    switch(type) {
        case 'add':
            key = 'add:remote';
            value = 'node add_remote_app.js'
            break;
        case 'start':
            key = 'start:' + name;
            value = 'ng serve ' + name;
            break;
        case 'build':
            key = 'build:' + name;
            value = 'bg build ' + name + ' --configuration production';
            break;
        case 'init':
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
      
    saveFile(pkgJsonPath, JSON.stringify(json, null, 2));
}


module.exports = {
    addScript,
    changeDir,
    executeCommand,
    executeCommandWithReturn
}
