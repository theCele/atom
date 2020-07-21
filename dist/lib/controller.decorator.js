"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ipc = exports.Controller = void 0;
require("reflect-metadata");
const electron_1 = require("electron");
const controllers = [];
const events = [];
function Controller() {
    return function classDecorator(constructor) {
        const name = (constructor) ? constructor.name : undefined;
        let c = controllers.find(c => c.name === name);
        if (!c)
            controllers.push(constructor);
        else
            throw new Error('Duplicate controller name');
    };
}
exports.Controller = Controller;
/**
 * Ipc
 * Make method available in renderer
 * @param channel (optional) listening channel - {classname}:{methodname}::{channel}
 */
function Ipc(channel) {
    return function (target, propertyKey, descriptor) {
        const name = target.constructor.name;
        const listeningChannel = `ipc:${name}/${propertyKey}${(channel) ? `/${channel}` : ''}`;
        if (electron_1.ipcMain) {
            const e = events.find(c => c === listeningChannel);
            if (!e)
                events.push(listeningChannel);
            else
                throw new Error(`duplicate event name at controller ${name} and method ${propertyKey}`);
            electron_1.ipcMain.removeHandler(listeningChannel);
            electron_1.ipcMain.handle(listeningChannel, (event, ...args) => {
                descriptor.value(...args);
            });
        }
        else if (electron_1.ipcRenderer) {
            descriptor.value = (...args) => {
                return electron_1.ipcRenderer === null || electron_1.ipcRenderer === void 0 ? void 0 : electron_1.ipcRenderer.invoke(listeningChannel, ...args);
            };
        }
        else {
            throw new Error(`decorators must be in electron enviroment`);
        }
    };
}
exports.Ipc = Ipc;
//# sourceMappingURL=controller.decorator.js.map