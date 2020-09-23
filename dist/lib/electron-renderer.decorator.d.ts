import 'reflect-metadata';
/**
 * IPC CLIENT - PROPERTY DECORATOR
 * @param controllerName controller name located in electron main
 * @param methodName method name in the same controller
 * @param args any arguments for the above method
 * @returns Promise
 */
export declare const IpcClient: (controllerName: string, methodName: string, ...args: any) => (target: Object, propertyKey: string) => void;
