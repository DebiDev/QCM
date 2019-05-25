import { Injectable } from "@angular/core";
import { IpcRenderer } from "electron";

@Injectable({
  providedIn: "root"
})
export class FileService {
  private ipc: IpcRenderer;

  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require("electron").ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn("Could not load electron ipc");
    }
  }

  async getJSON() {
    return new Promise<string[]>((resolve, reject) => {
		this.ipc.once("getFilesResponse", (event, arg) => {
			resolve(arg);
		});
		this.ipc.send("getFiles");
    });
  }

  updateJSON(file) {
  	return new Promise<string[]>((resolve, reject) => {
	  	this.ipc.once("JSONUpdated", (event, arg) => {
	  		resolve();
	  	});
	  	this.ipc.send("updateFile", file);
	  });
  }

  importQCM() { 
    return new Promise<string>((resolve, reject) => {
      this.ipc.once("QCMImported", (event, arg) => {
        let text = arg;
        let doc = text.split("\\begin{document}");
        resolve(doc[1]);
      });
      this.ipc.send("importQCM");
    });
  }

  exportQCM(stringArray) {
    return new Promise<string[]>((resolve, reject) => {
      this.ipc.once("QCMExported", (event, arg) => {
        resolve();
      });
      this.ipc.send("exportQCM", stringArray);
    });
  }
}
