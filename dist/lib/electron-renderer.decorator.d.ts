import 'reflect-metadata';
/**
 * IpcPost - Mehtod Decorator adds last argument with promise result of the controller
 * @param controllerName controller name located in electron main
 * @param methodName method name in the same controller
 */
export declare function IpcClient(controllerName: string, methodName: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
