import 'reflect-metadata';
interface IModuleOptions {
    controllers?: any[];
    children?: any[];
}
/**
 * Module - Class Decorator
 * @param options IModuleOptions
 */
export declare function Module(options?: IModuleOptions): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        controllersSignitures: any[];
        controllers: any[];
        children: any[];
    };
} & T;
/**
 * Controller - Class Decorator
 */
export declare const Controller: () => <T extends new (...args: any[]) => {}>(constructor: T) => void;
/**
 * IPC SERVER - Method Decorator
 * Make method available in renderer
 * @param channel (optional) listening channel - {classname}:{methodname}::{channel}
 */
export declare const IpcServer: () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * Parameter Decorator for IpcMainEvent
 * Works only if used with IpcServer decorator
 */
export declare const IpcMainEvent: () => (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
export {};
