export const isMain = (): boolean => {
    try {
        if (require('electron').ipcMain) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

export const preload = (): void => {
    try {
        const contextBridge = require('electron').contextBridge;
        const ipc = require('electron').ipcRenderer;
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
    } catch (err) {
        return;
    }
};