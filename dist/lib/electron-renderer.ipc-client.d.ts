/**
 * Static ipc client
 */
export declare class IpcClient {
    private static _ipc;
    private static get ipc();
    /**
     * Invoke controler method in main
     * T: expected return
     * @param controllerName controller name located in electron main
     * @param methodName method name in the same controller
     * @param args
     */
    static invoke<T>(controllerName: string, methodName: string, ...args: any): Promise<T>;
}
