"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preload = exports.isMain = void 0;
exports.isMain = () => {
    try {
        if (require('electron').ipcMain) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        return false;
    }
};
exports.preload = () => {
    try {
        const contextBridge = require('electron').contextBridge;
        const ipc = require('electron').ipcRenderer;
        // Expose protected methods that allow the renderer process to use
        // the ipcRenderer without exposing the entire object
        contextBridge.exposeInMainWorld("ipcRenderer", {
            invoke: (listeningChannel, ...args) => {
                return ipc.invoke(listeningChannel, ...args);
            },
            send: (listeningChannel, ...args) => {
                ipc.send(listeningChannel, ...args);
            },
            on: (listeningChannel, listener) => {
                ipc.on(listeningChannel, listener);
            }
        });
    }
    catch (err) {
        return;
    }
};
//# sourceMappingURL=electron.utilities.js.map