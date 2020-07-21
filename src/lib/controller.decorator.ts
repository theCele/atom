import 'reflect-metadata';
import { ipcMain, ipcRenderer } from 'electron';
const controllers: any[] = [];
const events: string[] = [];

export function Controller() {
    return function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
        const name: string | undefined = (constructor) ? constructor.name : undefined;
        let c = controllers.find(c => c.name === name);
        if (!c) controllers.push(constructor)
        else throw new Error('Duplicate controller name');
    }
}


/**
 * Ipc
 * Make method available in renderer
 * @param channel (optional) listening channel - {classname}:{methodname}::{channel}
 */
export function Ipc(channel?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const name = (target.constructor.name as string);
        const listeningChannel = `ipc:${name}/${propertyKey}${(channel) ? `/${channel}` : ''}`;
        if (ipcMain) {
            const e = events.find(c => c === listeningChannel);
            if (!e) events.push(listeningChannel)
            else throw new Error(`duplicate event name at controller ${name} and method ${propertyKey}`);
            ipcMain.removeHandler(listeningChannel);
            ipcMain.handle(listeningChannel, (event: Electron.IpcMainEvent | undefined, ...args: any) => {
                descriptor.value(...args);
            });
        } else if (ipcRenderer) {
            descriptor.value = (...args: any) => {
                return ipcRenderer?.invoke(listeningChannel, ...args);
            }
        } else {
            throw new Error(`decorators must be in electron enviroment`);
        }
    }
}