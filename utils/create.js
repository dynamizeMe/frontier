const { execSync } = require('node:child_process');
const { chdir } = require('node:process');
const { addScript, changeDir } = require('./util.js');
const appRoutingModuleData = require('../create_data/app.routing.module.js');
const appModuleData = require('../create_data/app.module.js');
const federationUtilData = require('../create_data/federation.utils.js');
const microfrontendServiceData = require('../create_data/microforntedn.service.js');
const microfrontendModelData = require('../create_data/microfrontend.model.js');
const routeUtilsData = require('../create_data/route.utils.js');

function addApplication(name, port, isShell, callBackFunction) {
    console.log(`Creating angular application: ${name}`)
    execSync(`ng generate application ${name} --routing --style="scss"`);
    execSync(`ng add @angular-architects/module-federation --project=${name} --port=${port} --skip-confirmation`);
    if(isShell) {
        setupShellApp(name);
    }
    if(callBackFunction) {
        callBackFunction();
    }
}

function createAddFile() {
    let fs = require("fs");  
    fs.writeFileSync(
        'add_remote_app.js', 
        `const { createApp } = require('micros-frontier');\n\ncreateApp();`
    )
    addScript('add');
}

function setupShellApp(name) {
    const fs = require("fs");
    changeDir(`/projects/${name}/src/app`);
    fs.writeFileSync('app-routing.module.ts', appRoutingModuleData);
    execSync('mkdir utils');
    execSync('mkdir services');
    execSync('mkdir models');
    changeDir('/utils');
    fs.writeFileSync('federation-utils.ts', federationUtilData);
    fs.writeFileSync('route-utils.ts', routeUtilsData);
    chdir('../');
    changeDir('/models');
    fs.writeFileSync('microfrontend.model.ts', microfrontendModelData);
    chdir('../');
    changeDir('/services');
    fs.writeFileSync('microfrontend.service.ts', microfrontendServiceData);
    chdir('../');
    fs.writeFileSync('app.module.ts', appModuleData);
}

module.exports = {
    addApplication,
    createAddFile,
    setupShellApp
}