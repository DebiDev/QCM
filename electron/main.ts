/*Main JS Script for Electron (Node.js)*/
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import * as path from "path";
import * as url from "url";

//Import File System
const fs = require('fs');
//Import LineReader
const readline = require('readline');

let win: BrowserWindow;

/*Both listeners are used to know when the app is ready*/
app.on("ready", createWindow);

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

/*Create a new windows with custom dimensions and load the built Angular project*/
function createWindow() {
  win = new BrowserWindow({ width: 1100, height: 900 });

  /*load the index.html in Electron interface*/
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "/../../dist/QCM/index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  //Open DevTools when the software starts
  // win.webContents.openDevTools();

  /*Window listener which send DB file on trigger*/
  ipcMain.on("getFiles", (event, arg) => {
    const files = JSON.parse(fs.readFileSync("DbQCM.json", "utf8"));
    console.log(files);
    win.webContents.send("getFilesResponse", files);
  });

  /*Window listener to update DB*/
  ipcMain.on("updateFile", (event, arg) => {
    //Get the file and put it in good format
    let data = JSON.stringify(arg, null, 2);
    //Update the file
    fs.writeFileSync("DbQCM.json", data);
    win.webContents.send("JSONUpdated");
  })

  ipcMain.on("importQCM", (event, arg) => {
    dialog.showOpenDialog({ 
      properties: ['openFile'],
      filters: [{
        name: 'Fichier texte',
        extensions: ['txt', 'tex']
      }]
    }, (filePath) => {
      console.log(filePath);
      let data = fs.readFileSync(filePath[0], "utf8");
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
    })
  })

  ipcMain.on("exportQCM", (event, arg) => {
    let stringContent = arg;
    console.log(stringContent);
    dialog.showSaveDialog({
      filters: [{
        name: 'Fichier texte',
        extensions: ['txt']
      }]
    },(fileName) => {
      if (fileName === undefined){
          console.log("You didn't save the file");
          return;
      }
      
      // fileName is a string that contains the path and filename created in the save file dialog.  
      fs.writeFile(fileName, stringContent, (err) => {
          if(err){
              console.log("An error ocurred creating the file "+ err.message)
          }
          win.webContents.send("QCMExported");    
          console.log("The file has been succesfully saved");
      });
    });
  })

  /*Listener which is triggered when the windows is closed*/
  win.on("closed", () => {
    win = null;
  });
}