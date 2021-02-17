import * as path from 'path';
import { BrowserWindow as BW, BrowserWindowConstructorOptions } from 'electron';
import { ElectronInstance } from './electron-main.electron-instance';
let BrowserWindowConstructorOptions;
const _window_repository: BrowserWindow[] = [];

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
                    preload: path.join(__dirname, 'preload.js')
                }
            }
            options = {...options, ...preloadOptions};
        } else {
            console.warn('nodeIntegration is enabled. If you want to use IpcClient please disable node integration');
        }

        _window_repository.push(new BrowserWindow(options));
        let win = _window_repository[_window_repository.length - 1];
        win.on('close', () => {
            if (win) {
                const index = _window_repository.findIndex(c => {
                    if (c) {
                        return c.id === win.id
                    } else {
                        return false;
                    }
                });
                if (index) {
                    win = undefined;
                    _window_repository[index] = undefined;
                }
            }
        });
        if (options.url || (ElectronInstance.getDto<any>() && ElectronInstance.getDto<any>().window && ElectronInstance.getDto<any>().window.url)) { 
            win.loadURL((ElectronInstance.getDto<any>() && ElectronInstance.getDto<any>().window && ElectronInstance.getDto<any>().window.url) ? ElectronInstance.getDto<any>().window.url : options.url) 
        }
        else if (options.file) { win.loadFile(options.file) };
        return _window_repository[_window_repository.length - 1];
    }

    public static getAll() {
        let windows = _window_repository.filter(w => {
            if (w) return true;
            else return false;
        });
        return windows;
    }
}