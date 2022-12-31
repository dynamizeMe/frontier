const { changeDir, executeCommand } = require('./util.js');
const appRoutingModuleData = require('../create_data/app.routing.module.js');
const appModuleData = require('../create_data/app.module.js');
const federationUtilData = require('../create_data/federation.utils.js');
const microfrontendServiceData = require('../create_data/microforntedn.service.js');
const microfrontendModelData = require('../create_data/microfrontend.model.js');
const routeUtilsData = require('../create_data/route.utils.js');

function addApplication(name, port, isShell, callBackFunction) {
    console.log(`Creating angular application: ${name}`)
    executeCommand(`ng generate application ${name} --routing --style="scss"`);
    executeCommand(`ng add @angular-architects/module-federation --project=${name} --port=${port} --skip-confirmation`);
    if(isShell) {
        setupShellApp(name);
    }
    if(callBackFunction) {
        callBackFunction();
    }
}

function setupShellApp(name) {
    const fs = require("fs");
    changeDir(`/projects/${name}/src/app`);
    fs.writeFileSync('app-routing.module.ts', appRoutingModuleData);
    executeCommand('mkdir utils');
    executeCommand('mkdir services');
    executeCommand('mkdir models');
    changeDir('/utils');
    fs.writeFileSync('federation-utils.ts', federationUtilData);
    fs.writeFileSync('route-utils.ts', routeUtilsData);
    changeDir('../');
    changeDir('/models');
    fs.writeFileSync('microfrontend.model.ts', microfrontendModelData);
    changeDir('../');
    changeDir('/services');
    fs.writeFileSync('microfrontend.service.ts', microfrontendServiceData);
    changeDir('../');
    fs.writeFileSync('app.module.ts', appModuleData);
}

module.exports = {
    addApplication,
    setupShellApp
}
