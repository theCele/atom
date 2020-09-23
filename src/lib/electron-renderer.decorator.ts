import 'reflect-metadata';
import { ipcMain, ipcRenderer } from "electron";

/**
 * IPC CLIENT - PROPERTY DECORATOR
 * @param controllerName controller name located in electron main
 * @param methodName method name in the same controller
 * @param args any arguments for the above method
 * @returns Promise
 */
export const IpcClient = (controllerName: string, methodName: string, ...args: any) => {
    return (target: Object, propertyKey: string) => {
        if (ipcRenderer) {
            const listeningChannel = (`ipc_${controllerName}_${methodName}`).toUpperCase();
            const getter = () => {
                return ipcRenderer?.invoke(listeningChannel, ...args)
            };
            Object.defineProperty(target, propertyKey, {
                get: getter
            });
        } else if (ipcMain) {
            throw new Error(`use this decorator only in electron renderer`);
        } else {
            throw new Error(`decorators must be in electron enviroment`);
        }
    }
}