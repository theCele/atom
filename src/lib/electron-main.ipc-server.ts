import { IpcMain } from "electron";
import * as uniqid from 'uniqid';

/**
 * Static ipc client
 */
export class IpcServer {
    // check preload script for available methods
    private static _ipc: IpcMain;
    private static get ipc() : IpcMain {
        try {
            this._ipc = require("electron").ipcMain;
            if (!this._ipc) throw new Error('please use this in electron main envirenment, for renderer use atom/dist/renderer');
        } catch (err) {
            throw err;
        }
        return this._ipc;
    }

    /**
     * Invoke controler method in main
     * T: expected return
     * @param controllerName controller name located in electron main
     * @param methodName method name in the same controller
     * @param args 
     */
    public static invoke<T>(controllerName: string, methodName: string, ...args: any): Promise<T> {
        return new Promise((resolve, reject) => {
            let listeningChannel = (`ipc_${controllerName}_${methodName}`).toUpperCase();
            let listeningChannelResult = (`ipc_${uniqid()}_${controllerName}_${methodName}_return`).toUpperCase();
            this.ipc.emit(listeningChannel, listeningChannelResult, ...args);
            (this.ipc as any).once(listeningChannelResult, (result: T) => {
                resolve(result);
            });
            (this.ipc as any).once(`${listeningChannelResult}_ERROR`, (err: any) => {
                reject(err);
            });
        });
    }
}