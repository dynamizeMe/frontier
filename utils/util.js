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

    saveFile(pkgJsonPath, JSON.stringify(json, null, 2));
}

function addExport(name) {
  const saveFile = require('fs').writeFileSync;
  const pkgJsonPath = `${cwd()}/package.json`;
  console.log(`Path: ${pkgJsonPath}`);
  const json = require(pkgJsonPath);
  if (!json.hasOwnProperty('exports')) {
    json.exports = {};
  }
  json.exports[`./projects*`] = `./projects/*/webpack.config.js`;
  saveFile(pkgJsonPath, JSON.stringify(json, null, 2));
}


module.exports = {
  addExport,
  addScript,
  changeDir,
  executeCommand,
  executeCommandWithReturn
}
