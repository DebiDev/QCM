"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    var _this = this;
    win = new electron_1.BrowserWindow({ width: 1100, height: 900 });
    /*load the index.html in Electron interface*/
    win.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/QCM/index.html"),
        protocol: "file:",
        slashes: true
    }));
    var isMac = process.platform === 'darwin';
    //Creation of a custom menu
    var template = [];
    // { role: 'fileMenu' }
    template.push({
        label: 'File',
        submenu: [
            isMac ? { role: 'close' } : { role: 'quit' }
        ]
    });
    // { role: 'editMenu' }
    template.push({
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' }
        ].concat((isMac ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
                label: 'Speech',
                submenu: [
                    { role: 'startspeaking' },
                    { role: 'stopspeaking' }
                ]
            }
        ] : [
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
        ]))
    });
    // { role: 'viewMenu' }
    template.push({
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    });
    // { role: 'windowMenu' }
    template.push({
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'zoom' }
        ].concat((isMac ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
        ] : [
            { role: 'close' }
        ]))
    });
    // { role: 'helpMenu' }
    template.push({
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: function () { return __awaiter(_this, void 0, void 0, function () {
                    var shell;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                shell = require('electron').shell;
                                return [4 /*yield*/, shell.openExternal('https://electronjs.org')];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }
            },
            {
                label: 'GitHub Repository',
                click: function () { return __awaiter(_this, void 0, void 0, function () {
                    var shell;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                shell = require('electron').shell;
                                return [4 /*yield*/, shell.openExternal('https://github.com/DebiDev/QCM')];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }
            }
        ]
    });
    var menu = electron_1.Menu.buildFromTemplate(template);
    electron_1.Menu.setApplicationMenu(menu);
    //Open DevTools when the software starts
    // win.webContents.openDevTools();
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