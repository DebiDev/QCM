"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*Main JS Script for Electron (Node.js)*/
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
//Import File System
var fs = require('fs');
//Import LineReader
var readline = require('readline');
var win;
/*Both listeners are used to know when the app is ready*/
electron_1.app.on("ready", createWindow);
electron_1.app.on("activate", function () {
    if (win === null) {
        createWindow();
    }
});
/*Create a new windows with custom dimensions and load the built Angular project*/
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 1100, height: 900 });
    /*load the index.html in Electron interface*/
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/QCM/index.html"),
        protocol: "file:",
        slashes: true
    }));
    win.webContents.openDevTools();
    /*Window listener which send DB file on trigger*/
    electron_1.ipcMain.on("getFiles", function (event, arg) {
        var files = JSON.parse(fs.readFileSync("DbQCM.json", "utf8"));
        console.log(files);
        win.webContents.send("getFilesResponse", files);
    });
    /*Window listener to update DB*/
    electron_1.ipcMain.on("updateFile", function (event, arg) {
        //Get the file and put it in good format
        var data = JSON.stringify(arg, null, 2);
        //Update the file
        fs.writeFileSync("DbQCM.json", data);
        win.webContents.send("JSONUpdated");
    });
    electron_1.ipcMain.on("importQCM", function (event, arg) {
        electron_1.dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{
                    name: 'Fichier texte',
                    extensions: ['txt', 'tex']
                }]
        }, function (filePath) {
            console.log(filePath);
            var data = fs.readFileSync(filePath[0], "utf8");
            console.log(data);
            win.webContents.send("QCMImported", data);
            // var rd = readline.createInterface({
            //     input: fs.createReadStream(filePath),
            //     output: process.stdout,
            //     console: false
            // });
            // rd.on('line', function(line) {
            //     console.log(line);
            // });
        });
    });
    electron_1.ipcMain.on("exportQCM", function (event, arg) {
        var stringContent = arg;
        console.log(stringContent);
        electron_1.dialog.showSaveDialog({
            filters: [{
                    name: 'Fichier texte',
                    extensions: ['txt']
                }]
        }, function (fileName) {
            if (fileName === undefined) {
                console.log("You didn't save the file");
                return;
            }
            // fileName is a string that contains the path and filename created in the save file dialog.  
            fs.writeFile(fileName, stringContent, function (err) {
                if (err) {
                    console.log("An error ocurred creating the file " + err.message);
                }
                win.webContents.send("QCMExported");
                console.log("The file has been succesfully saved");
            });
        });
    });
    /*Listener which is triggered when the windows is closed*/
    win.on("closed", function () {
        win = null;
    });
}
//# sourceMappingURL=main.js.map