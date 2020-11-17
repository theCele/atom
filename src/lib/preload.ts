const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "ipcRenderer", {
        invoke: (listeningChannel: string, ...args: any) : Promise<any> => {
            return ipcRenderer.invoke(listeningChannel, ...args);
        }
    }
);