"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcClient = void 0;
require("reflect-metadata");
let ipcRenderer = undefined;
try {
    ipcRenderer = require("electron").ipcRenderer;
}
catch (err) {
    ipcRenderer = window.ipcRenderer;
}
/**
 * IpcPost - Mehtod Decorator adds last argument with promise result of the controller
 * @param controllerName controller name located in electron main
 * @param methodName method name in the same controller
 */
function IpcClient(controllerName, methodName) {
    return function (target, propertyKey, descriptor) {
        if (ipcRenderer) {
            const listeningChannel = (`ipc_${controllerName}_${methodName}`).toUpperCase();
            const method = descriptor.value;
            descriptor.value = function (...args) {
                return method.apply(this, [...args, ipcRenderer.invoke(listeningChannel, ...args)]);
            };
        }
        else {
            throw new Error(`decorators must be in electron renderer enviroment`);
        }
    };
}
exports.IpcClient = IpcClient;
//# sourceMappingURL=electron-renderer.decorator.js.map