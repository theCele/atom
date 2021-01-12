import { IIpcRenderer } from "./preload";

/**
 * Static ipc client
 */
export class IpcClient {
    // check preload script for available methods
    private static _ipc: IIpcRenderer;
    private static get ipc() : IIpcRenderer {
        try {
            this._ipc = require("electron").ipcRenderer as any;
            if (!this._ipc) throw new Error('undefined');
        } catch (err) {
            this._ipc = (window as any).ipcRenderer;
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
            this.ipc.invoke(listeningChannel, ...args)
            .then(r => resolve(r))
            .catch(err => reject(err));
        });
    }
}