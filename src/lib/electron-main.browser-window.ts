import * as path from 'path';
import { BrowserWindow as BW, BrowserWindowConstructorOptions } from 'electron';
import { ElectronInstance } from './electron-main.electron-instance';
// let BrowserWindowConstructorOptions;
const _window_repository = new Map<number, BrowserWindow>();

export interface IBrowserWindowConstructorOptions extends BrowserWindowConstructorOptions {
    url?: string;
    file?: string;
}

export class BrowserWindow extends BW {
    constructor(options?: IBrowserWindowConstructorOptions) {
        const dto = ElectronInstance.getDto<any>();
        if (dto && dto.window) options = {...options, ...dto.window};
        super(options);
    }

    public static create(options?: IBrowserWindowConstructorOptions) {
        // check if node integration is enabled
        let nodeIntegration = false;
        if (options && options.webPreferences && options.webPreferences.nodeIntegration) nodeIntegration = true;
        if (!nodeIntegration) {
            const preloadOptions:BrowserWindowConstructorOptions = {
                webPreferences: {
                    contextIsolation: true,
                    preload: options.webPreferences ? (options.webPreferences.preload ? options.webPreferences.preload : path.join(__dirname, 'preload.js')) : path.join(__dirname, 'preload.js')
                }
            }
            options = {...options, ...preloadOptions};
        } else {
            console.warn('nodeIntegration is enabled. If you want to use IpcClient please disable node integration');
        }

        const win = new BrowserWindow(options);
        _window_repository.set(win.id, win);
        win.on('close', () => {
            if (win) {
                _window_repository.delete(win.id);
            }
        });
        if (options.url || (ElectronInstance.getDto<any>() && ElectronInstance.getDto<any>().window && ElectronInstance.getDto<any>().window.url)) { 
            win.loadURL((ElectronInstance.getDto<any>() && ElectronInstance.getDto<any>().window && ElectronInstance.getDto<any>().window.url) ? ElectronInstance.getDto<any>().window.url : options.url) 
        }
        else if (options.file) { win.loadFile(options.file) };
        return win;
    }

    public static getAll() {
        let windows: BrowserWindow[];
        for (const iterator of _window_repository.values()) {
            windows.push(iterator);
        }
        return windows;
    }
}