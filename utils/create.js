import { addScript, changeDir, executeCommand, executeCommandWithReturn } from './util.js';
import { appRoutingModuleData } from '../create_data/app.routing.module.js';
import { customManifestData } from '../create_data/custom-manifest.js';
import { routesData } from '../create_data/routes.js';
import { routefactoryData } from '../create_data/route-factory.js';
import fs from "fs";

export function addApplication(name, port, isHost, callBackFunction) {
  const cliVersion = executeCommandWithReturn("ng version | awk 'FNR == 10 {print $3}'");
  const cliMajorVer = cliVersion.split('.')[0];
  console.log(`Creating angular application: ${name}`)
  executeCommand(`ng generate application ${name} --routing --style="scss"`);

  if(cliMajorVer > 13) {
    if(isHost) {
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

export function setupShellApp(name) {
  changeDir(`/projects/${name}/src/app`);
  executeCommand('mkdir microfrontends');
  executeCommand('mkdir components');
  changeDir('/components');
  executeCommand('ng g c main');
  changeDir('../');
  changeDir('/microfrontends');
  fs.writeFileSync('custom-manifest.ts', customManifestData);
  fs.writeFileSync('routes.ts', routesData);
  fs.writeFileSync('route-factory.ts', routefactoryData);
  changeDir('../');
  fs.writeFileSync('app-routing.module.ts', appRoutingModuleData);
  changeDir('../../../../');
}

export function addScripts(name) {
  addScript('start', name);
  addScript('build', name);
  addScript('watch', name);
}
