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
        // contextBridge API can only be used when contextIsolation is enabled
        // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
        // Consider using contextBridge.exposeInMainWorld
        // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
        if (err.message.includes('contextBridge API can only be used when contextIsolation is enabled')) {
            const ipc = require('electron').ipcRenderer;
            window.ipcRenderer = {
                invoke: (listeningChannel, ...args) => {
                    return ipc.invoke(listeningChannel, ...args);
                },
                send: (listeningChannel, ...args) => {
                    ipc.send(listeningChannel, ...args);
                },
                on: (listeningChannel, listener) => {
                    ipc.on(listeningChannel, listener);
                }
            };
        }
        else {
            return;
        }
    }
};
//# sourceMappingURL=electron.utilities.js.map