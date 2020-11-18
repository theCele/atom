"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpcServer = exports.Controller = exports.Module = void 0;
require("reflect-metadata");
const electron_1 = require("electron");
const controllersSignitures = [];
const controllers = [];
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
        let c = controllersSignitures.find(c => c.name === name);
        if (!c)
            controllersSignitures.push(constructor);
        else
            throw new Error(`Duplicate controller name ${name}`);
    };
};
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
            electron_1.ipcMain.removeHandler(listeningChannel);
            electron_1.ipcMain.handle(listeningChannel, (event, ...args) => {
                let controller = controllers.find(c => c.constructor.name === target.constructor.name);
                if (!controller)
                    throw new Error(`controller ${name} and method ${propertyKey} does not exist`);
                return controller[propertyKey](...args);
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
//# sourceMappingURL=electron-main.decorator.js.map