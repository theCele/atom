"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcClient = void 0;
require("reflect-metadata");
const electron_1 = require("electron");
/**
 * IPC CLIENT - PROPERTY DECORATOR
 * @param controllerName controller name located in electron main
 * @param methodName method name in the same controller
 * @param args any arguments for the above method
 * @returns Promise
 */
exports.IpcClient = (controllerName, methodName, ...args) => {
    return (target, propertyKey) => {
        if (electron_1.ipcRenderer) {
            const listeningChannel = (`ipc_${controllerName}_${methodName}`).toUpperCase();
            const getter = () => {
                return electron_1.ipcRenderer?.invoke(listeningChannel, ...args);
            };
            Object.defineProperty(target, propertyKey, {
                get: getter
            });
        }
        else if (electron_1.ipcMain) {
            throw new Error(`use this decorator only in electron renderer`);
        }
        else {
            throw new Error(`decorators must be in electron enviroment`);
        }
    };
};
//# sourceMappingURL=electron-renderer.decorator.js.map