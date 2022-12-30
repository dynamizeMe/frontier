const { createApp } = require('./utils/add_remote.js');
const { setup } = require('./index.js')

function execute() {
    if(process.argv[1] === '--init') {
        setup();
    }
    else if(process.argv[1] === '--add') {
        createApp();
    }
    else {
        console.log('Invalid arguments.');
    }
}

execute();
