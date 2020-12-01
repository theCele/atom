import { contextBridge, ipcRenderer as ipc } from "electron";

//Exposed
export interface IIpcRenderer {
    invoke: (listeningChannel: string, ...args: any) => Promise<any>,
    send: (listeningChannel: string, ...args: any) => Promise<any>,
    on: (listeningChannel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => void
}

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "ipcRenderer", {
        invoke: (listeningChannel: string, ...args: any) : Promise<any> => {
            return ipc.invoke(listeningChannel, ...args);
        },
        send: (listeningChannel: string, ...args: any[]) => {
            ipc.send(listeningChannel, ...args);
        },
        on: (listeningChannel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => {
            ipc.on(listeningChannel, listener);
        }
    }
);