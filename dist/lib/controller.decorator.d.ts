import 'reflect-metadata';
export declare function Controller(): <T extends new (...args: any[]) => {}>(constructor: T) => void;
/**
 * Ipc
 * Make method available in renderer
 * @param channel (optional) listening channel - {classname}:{methodname}::{channel}
 */
export declare function Ipc(channel?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
