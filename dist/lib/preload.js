const { contextBridge, ipcRenderer } = require("electron");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("ipcRenderer", {
    invoke: (listeningChannel, ...args) => {
        return ipcRenderer.invoke(listeningChannel, ...args);
    }
});
//# sourceMappingURL=preload.js.map