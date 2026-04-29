const fse = require('fs-extra');
const project = require('../package.json');
const vueProject = require('../../vue-app/package.json');

//Update electron application version in config file
let { configEnv } = require('../src/config/env');
configEnv.electronAppVersion = project.version;
fse.outputFileSync('src/config/env.js', 'export const configEnv = ' + JSON.stringify(configEnv, null, 2));

//Generate txt file with version
fse.outputFileSync('version.txt', vueProject.version + '-' + project.version);
