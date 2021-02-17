import 'reflect-metadata';
import { ipcMain, ipcRenderer } from 'electron';

const controllersSignature: any[] = [];
const controllers: any[] = [];
const injectablesSignature: any[] = [];
const injectables: any[] = [];
const events: string[] = [];

interface IModuleOptions {
    controllers?: any [],
    children?: any []
}

/**
 * Module - Class Decorator
 * @param options IModuleOptions
 */
export function Module(options?: IModuleOptions) {
    return function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
        return class extends constructor {
            controllersSignitures: any [] = (options) ? (options.controllers ? options.controllers : []) : [];
            controllers: any [] = ((options) => {
                let controllerInstances = (options) ? ((options.controllers) ? options.controllers.map(c => new c()) : []) : [];
                for (let i = 0; i < controllerInstances.length; i++) {
                    const controller = controllerInstances[i];
                    let f = controllers.find(c => c.constructor.name === controller.constructor.name);
                    if (!f) controllers.push(controller);
                }
                return controllerInstances;
            })(options) ;
            children: any [] = (options) ? ((options.children) ? options.children.map(m => new m()) : []) : [];
        }
    }
}

/**
 * Controller - Class Decorator
 */
export const Controller = () => {
    return <T extends {new(...args:any[]):{}}>(constructor:T) => {
        const name: string | undefined = (constructor) ? constructor.name : undefined;
        let c = controllersSignature.find(c => c.name === name);
        if (!c) controllersSignature.push(constructor)
        else throw new Error(`Duplicate controller name ${name}`);
    }
}

/**
 * Injectable - Class decorator
 */
const Injectable = () => {
    return <T extends {new(...args:any[]):{}}>(constructor:T) => {
        const name: string | undefined = (constructor) ? constructor.name : undefined;
        let c = injectablesSignature.find(c => c.name === name);
        if (!c) injectablesSignature.push(constructor)
        else throw new Error(`Duplicate controller name ${name}`);
    }
}


const ipcMainEventMetadataKey = Symbol("required");

/**
 * IPC SERVER - Method Decorator
 * Make method available in renderer
 * @param channel (optional) listening channel - {classname}:{methodname}::{channel}
 */
export const IpcServer = () => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (ipcMain) {
            const name = (target.constructor.name as string);
            const listeningChannel = (`ipc_${name}_${propertyKey}`).toUpperCase();
            
            const e = events.find(c => c === listeningChannel);
            if (!e) events.push(listeningChannel)
            else throw new Error(`duplicate event name at controller ${name} and method ${propertyKey}`);

            let ipcMainEventParameters: number[] = Reflect.getOwnMetadata(
                ipcMainEventMetadataKey,
                target,
                propertyKey
            );

            let ipcMainEventParametersIndex: number | undefined = undefined;
            if (ipcMainEventParameters && ipcMainEventParameters.length > 0) {
                ipcMainEventParametersIndex = ipcMainEventParameters[0];
            }
            
            ipcMain.removeHandler(listeningChannel);
            ipcMain.handle(listeningChannel, (event: Electron.IpcMainEvent | undefined, ...args: any) => {
                let controller = controllers.find(c => c.constructor.name === target.constructor.name);
                if (ipcMainEventParametersIndex) args[ipcMainEventParametersIndex] = event;
                if (!controller) throw new Error(`controller ${name} and method ${propertyKey} does not exist`);
                return controller[propertyKey](...args);
            });

            ipcMain.removeAllListeners(listeningChannel);
            ipcMain.on(listeningChannel, (event: Electron.IpcMainEvent | undefined | string, ...args) => {
                if (event && typeof event === 'string' && (event as string).indexOf('__RETURN')) {
                    let controller = controllers.find(c => c.constructor.name === target.constructor.name);
                    if (!controller) throw new Error(`controller ${name} and method ${propertyKey} does not exist`);
                    const result = controller[propertyKey](...args, event);
                    if (result.then) {
                        result
                        .then((r: any) => ipcMain.emit(event, r))
                        .catch((err: any) => ipcMain.emit(`${event}_ERROR`, err));
                    } else {
                        ipcMain.emit(event, result);
                    }
                }
            });
        } else if (ipcRenderer) {
            throw new Error(`use this decorator only in electron main`);
        } else {
            throw new Error(`decorators must be in electron enviroment`);
        }
    }
}

/**
 * Parameter Decorator for IpcMainEvent
 * Works only if used with IpcServer decorator
 */
export const IpcMainEvent = () => {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        let existingRequiredParameters: number[] =
            Reflect.getOwnMetadata(ipcMainEventMetadataKey, target, propertyKey) || [];
        existingRequiredParameters.push(parameterIndex);
        Reflect.defineMetadata(
            ipcMainEventMetadataKey,
            existingRequiredParameters,
            target,
            propertyKey
        );
    }
}