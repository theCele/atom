"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcMainEvent = exports.IpcServer = exports.Controller = exports.Module = void 0;
require("reflect-metadata");
const electron_1 = require("electron");
const controllersSignature = [];
const controllers = [];
const injectablesSignature = [];
const injectables = [];
const events = [];
/**
 * Module - Class Decorator
 * @param options IModuleOptions
 */
function Module(options) {
    return function classDecorator(constructor) {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.controllersSignitures = (options) ? (options.controllers ? options.controllers : []) : [];
                this.controllers = ((options) => {
                    let controllerInstances = (options) ? ((options.controllers) ? options.controllers.map(c => new c()) : []) : [];
                    for (let i = 0; i < controllerInstances.length; i++) {
                        const controller = controllerInstances[i];
                        let f = controllers.find(c => c.constructor.name === controller.constructor.name);
                        if (!f)
                            controllers.push(controller);
                    }
                    return controllerInstances;
                })(options);
                this.children = (options) ? ((options.children) ? options.children.map(m => new m()) : []) : [];
            }
        };
    };
}
exports.Module = Module;
/**
 * Controller - Class Decorator
 */
exports.Controller = () => {
    return (constructor) => {
        const name = (constructor) ? constructor.name : undefined;
        let c = controllersSignature.find(c => c.name === name);
        if (!c)
            controllersSignature.push(constructor);
        else
            throw new Error(`Duplicate controller name ${name}`);
    };
};
/**
 * Injectable - Class decorator
 */
const Injectable = () => {
    return (constructor) => {
        const name = (constructor) ? constructor.name : undefined;
        let c = injectablesSignature.find(c => c.name === name);
        if (!c)
            injectablesSignature.push(constructor);
        else
            throw new Error(`Duplicate controller name ${name}`);
    };
};
const ipcMainEventMetadataKey = Symbol("required");
/**
 * IPC SERVER - Method Decorator
 * Make method available in renderer
 * @param channel (optional) listening channel - {classname}:{methodname}::{channel}
 */
exports.IpcServer = () => {
    return (target, propertyKey, descriptor) => {
        if (electron_1.ipcMain) {
            const name = target.constructor.name;
            const listeningChannel = (`ipc_${name}_${propertyKey}`).toUpperCase();
            const e = events.find(c => c === listeningChannel);
            if (!e)
                events.push(listeningChannel);
            else
                throw new Error(`duplicate event name at controller ${name} and method ${propertyKey}`);
            let ipcMainEventParameters = Reflect.getOwnMetadata(ipcMainEventMetadataKey, target, propertyKey);
            let ipcMainEventParametersIndex = undefined;
            if (ipcMainEventParameters && ipcMainEventParameters.length > 0) {
                ipcMainEventParametersIndex = ipcMainEventParameters[0];
            }
            electron_1.ipcMain.removeHandler(listeningChannel);
            electron_1.ipcMain.handle(listeningChannel, (event, ...args) => {
                let controller = controllers.find(c => c.constructor.name === target.constructor.name);
                if (ipcMainEventParametersIndex)
                    args[ipcMainEventParametersIndex] = event;
                if (!controller)
                    throw new Error(`controller ${name} and method ${propertyKey} does not exist`);
                return controller[propertyKey](...args);
            });
            electron_1.ipcMain.removeAllListeners(listeningChannel);
            electron_1.ipcMain.on(listeningChannel, (event, ...args) => {
                if (event && typeof event === 'string' && event.indexOf('__RETURN')) {
                    let controller = controllers.find(c => c.constructor.name === target.constructor.name);
                    if (!controller)
                        throw new Error(`controller ${name} and method ${propertyKey} does not exist`);
                    const result = controller[propertyKey](...args, event);
                    if (result.then) {
                        result
                            .then((r) => electron_1.ipcMain.emit(event, r))
                            .catch((err) => electron_1.ipcMain.emit(`${event}_ERROR`, err));
                    }
                    else {
                        electron_1.ipcMain.emit(event, result);
                    }
                }
            });
        }
        else if (electron_1.ipcRenderer) {
            throw new Error(`use this decorator only in electron main`);
        }
        else {
            throw new Error(`decorators must be in electron enviroment`);
        }
    };
};
/**
 * Parameter Decorator for IpcMainEvent
 * Works only if used with IpcServer decorator
 */
exports.IpcMainEvent = () => {
    return (target, propertyKey, parameterIndex) => {
        let existingRequiredParameters = Reflect.getOwnMetadata(ipcMainEventMetadataKey, target, propertyKey) || [];
        existingRequiredParameters.push(parameterIndex);
        Reflect.defineMetadata(ipcMainEventMetadataKey, existingRequiredParameters, target, propertyKey);
    };
};
//# sourceMappingURL=electron-main.decorator.js.map