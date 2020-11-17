import 'reflect-metadata';
let ipcRenderer: any = undefined;
try {
    ipcRenderer = require("electron").ipcRenderer;
} catch (err) {
    ipcRenderer = (window as any).ipcRenderer;
}

/**
 * IpcPost - Mehtod Decorator adds last argument with promise result of the controller
 * @param controllerName controller name located in electron main
 * @param methodName method name in the same controller
 */
export function IpcClient(controllerName: string, methodName: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (ipcRenderer) {
            const listeningChannel = (`ipc_${controllerName}_${methodName}`).toUpperCase();
            const method = descriptor.value;
            descriptor.value = function(...args: any) {
                return method.apply(this, [...args, ipcRenderer.invoke(listeningChannel, ...args)]);
            }
        } else {
            throw new Error(`decorators must be in electron renderer enviroment`);
        }
    }
}