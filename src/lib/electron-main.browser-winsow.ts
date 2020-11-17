import * as path from 'path';
import { BrowserWindow as BW, BrowserWindowConstructorOptions } from 'electron';
const _window_repository: BrowserWindow[] = [];

export class BrowserWindow extends BW {
    constructor(options?: BrowserWindowConstructorOptions) {
        super(options);   
    }

    public static create(options?: BrowserWindowConstructorOptions) {
        // check if node integration is enabled
        let nodeIntegration = false;
        if (options && options.webPreferences && options.webPreferences.nodeIntegration) nodeIntegration = true;
        if (!nodeIntegration) {
            if (options) {
                if (options.webPreferences) {
                    if (options.webPreferences) {
                        options.webPreferences.contextIsolation = true;
                        options.webPreferences.preload = path.join(__dirname, 'preload.js');
                    } else {
                        options.webPreferences = {
                            contextIsolation: true,
                            preload: path.join(__dirname, 'preload.js')
                        }
                    }
                }
                
            } else {
                options = {
                    webPreferences: {
                        contextIsolation: true,
                        preload: path.join(__dirname, 'preload.js')
                    }
                }
            }
        } else {
            console.warn('nodeIntegration is enebled. If you want to use preloader please disable node integration');
        }

        _window_repository.push(new BrowserWindow(options));
        let win = _window_repository[_window_repository.length - 1]
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