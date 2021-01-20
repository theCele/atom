"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcServer = void 0;
const uniqid = require("uniqid");
/**
 * Static ipc client
 */
class IpcServer {
    static get ipc() {
        try {
            this._ipc = require("electron").ipcMain;
            if (!this._ipc)
                throw new Error('please use this in electron main envirenment, for renderer use atom/dist/renderer');
        }
        catch (err) {
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
    static invoke(controllerName, methodName, ...args) {
        return new Promise((resolve, reject) => {
            let listeningChannel = (`ipc_${controllerName}_${methodName}`).toUpperCase();
            let listeningChannelResult = (`ipc_${uniqid()}_${controllerName}_${methodName}_return`).toUpperCase();
            this.ipc.emit(listeningChannel, listeningChannelResult, ...args);
            this.ipc.once(listeningChannelResult, (result) => {
                resolve(result);
            });
            this.ipc.once(`${listeningChannelResult}_ERROR`, (err) => {
                reject(err);
            });
        });
    }
}
exports.IpcServer = IpcServer;
//# sourceMappingURL=electron-main.ipc-server.js.map