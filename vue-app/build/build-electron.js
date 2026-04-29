const fse = require('fs-extra');

//Copy dist folder to Electron
console.log("Removing files from dist directory in Electron App...");
fse.emptyDirSync("../electron-app/dist/renderer");
console.log("Copying files from Vue to Electron App...");
fse.copySync("dist/", "../electron-app/dist/renderer");
console.log("Copy complete!");


