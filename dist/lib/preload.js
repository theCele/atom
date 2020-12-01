"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
electron_1.contextBridge.exposeInMainWorld("ipcRenderer", {
    invoke: (listeningChannel, ...args) => {
        return electron_1.ipcRenderer.invoke(listeningChannel, ...args);
    },
    send: (listeningChannel, ...args) => {
        electron_1.ipcRenderer.send(listeningChannel, ...args);
    },
    on: (listeningChannel, listener) => {
        electron_1.ipcRenderer.on(listeningChannel, listener);
    }
});
//# sourceMappingURL=preload.js.map