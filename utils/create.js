const { addScript, changeDir, executeCommand, executeCommandWithReturn } = require('./util');
const appRoutingModuleData = require('../create_data/app.routing.module');
const customManifestData = require('../create_data/custom-manifest');
const routesData = require('../create_data/routes');
const routefactoryData = require('../create_data/route-factory');

function addApplication(name, port, isShell, callBackFunction) {
  const cliVersion = executeCommandWithReturn("ng version | awk 'FNR == 10 {print $3}'");
  const cliMajorVer = cliVersion.split('.')[0];
  console.log(`Creating angular application: ${name}`)
  executeCommand(`ng generate application ${name} --routing --style="scss"`);

  if(cliMajorVer > 13) {
    if(isShell) {
      executeCommand(`ng add @angular-architects/module-federation --project=${name} --port=${port} --type dynamic-host --skip-confirmation`);
      setupShellApp(name);
    }
    else {
      executeCommand(`ng add @angular-architects/module-federation --project=${name} --port=${port} --type remote --skip-confirmation`);
    }
  }
  else {
    executeCommand(`ng add @angular-architects/module-federation --project=${name} --port=${port} --skip-confirmation`);
  }

  addScripts(name);

  if(callBackFunction) {
      callBackFunction();
  }
}

function setupShellApp(name) {
  const fs = require("fs");
  changeDir(`/projects/${name}/src/app`);
  executeCommand('mkdir microfrontedns');
  executeCommand('mkdir components');
  changeDir('/components');
  executeCommand('ng g c main');
  changeDir('../');
  changeDir('/microfrontedns');
  fs.writeFileSync('custom-manifest.ts', customManifestData);
  fs.writeFileSync('routes.ts', routesData);
  fs.writeFileSync('route-factory.ts', routefactoryData);
  changeDir('../');
  fs.writeFileSync('app-routing.module.ts', appRoutingModuleData);
  changeDir('../../../../');
}

function addScripts(name) {
  addScript('start', name);
  addScript('build', name);
  addScript('watch', name);
}

module.exports = {
    addApplication,
    setupShellApp
}
