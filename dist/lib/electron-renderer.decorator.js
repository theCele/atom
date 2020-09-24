"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcClient = void 0;
require("reflect-metadata");
const electron_1 = require("electron");
/**
 * IpcPost - Mehtod Decorator adds last argument with promise result of the controller
 * @param controllerName controller name located in electron main
 * @param methodName method name in the same controller
 */
function IpcClient(controllerName, methodName) {
    return function (target, propertyKey, descriptor) {
        if (electron_1.ipcRenderer) {
            const listeningChannel = (`ipc_${controllerName}_${methodName}`).toUpperCase();
            const method = descriptor.value;
            descriptor.value = function (...args) {
                return method.apply(this, [...args, electron_1.ipcRenderer?.invoke(listeningChannel, ...args)]);
            };
        }
        else if (electron_1.ipcMain) {
            throw new Error(`use this decorator only in electron renderer`);
        }
        else {
            throw new Error(`decorators must be in electron enviroment`);
        }
    };
}
exports.IpcClient = IpcClient;
//# sourceMappingURL=electron-renderer.decorator.js.map