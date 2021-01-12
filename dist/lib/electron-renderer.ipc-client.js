"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcClient = void 0;
/**
 * Static ipc client
 */
class IpcClient {
    static get ipc() {
        try {
            this._ipc = require("electron").ipcRenderer;
            if (!this._ipc)
                throw new Error('undefined');
        }
        catch (err) {
            this._ipc = window.ipcRenderer;
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
            this.ipc.invoke(listeningChannel, ...args)
                .then(r => resolve(r))
                .catch(err => reject(err));
        });
    }
}
exports.IpcClient = IpcClient;
//# sourceMappingURL=electron-renderer.ipc-client.js.map