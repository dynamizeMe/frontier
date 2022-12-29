const { execSync, exec } = require('node:child_process');
const { chdir, cwd } = require('node:process');

const saveFile = require('fs').writeFileSync;

function addApplication(name, port) {
    console.log(`Creating angular application: ${name}`)
    execSync(`ng generate application ${name} --routing --style="scss"`);
    execSync(`ng add @angular-architects/module-federation --project=${name} --port=${port} --skip-confirmation`);
    createAddfile();
}

function createAddfile() {
    let fs = require("fs");  
    fs.writeFileSync(
        'add_remote_app.js', 
        `const { createApp } = require('micros-frontier');\n\ncreateApp();`
    )
    addScript('add');
}

function executeCommand(command) {
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

function addScript(type, name) {
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
        default:
        // code block
    }

    if (!json.hasOwnProperty('scripts')) {
        json.scripts = {};
    }
      
    json.scripts[key] = value;
      
    saveFile(pkgJsonPath, JSON.stringify(json, null, 2));
}

function changeDir(dir) {
    try {
        chdir(`${dir}`);
        console.log(`New directory: ${cwd()}`);
    } catch (err) {
        console.error(`chdir: ${err}`);
    }
}

module.exports = {
    addApplication,
    addScript,
    changeDir,
    executeCommand
}
