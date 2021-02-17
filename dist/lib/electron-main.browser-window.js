"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserWindow = void 0;
const path = require("path");
const electron_1 = require("electron");
const electron_main_electron_instance_1 = require("./electron-main.electron-instance");
let BrowserWindowConstructorOptions;
const _window_repository = [];
class BrowserWindow extends electron_1.BrowserWindow {
    constructor(options) {
        const dto = electron_main_electron_instance_1.ElectronInstance.getDto();
        if (dto && dto.window)
            options = { ...options, ...dto.window };
        super(options);
    }
    static create(options) {
        // check if node integration is enabled
        let nodeIntegration = false;
        if (options && options.webPreferences && options.webPreferences.nodeIntegration)
            nodeIntegration = true;
        if (!nodeIntegration) {
            const preloadOptions = {
                webPreferences: {
                    contextIsolation: true,
                    preload: path.join(__dirname, 'preload.js')
                }
            };
            options = { ...options, ...preloadOptions };
        }
        else {
            console.warn('nodeIntegration is enabled. If you want to use IpcClient please disable node integration');
        }
        _window_repository.push(new BrowserWindow(options));
        let win = _window_repository[_window_repository.length - 1];
        win.on('close', () => {
            if (win) {
                const index = _window_repository.findIndex(c => {
                    if (c) {
                        return c.id === win.id;
                    }
                    else {
                        return false;
                    }
                });
                if (index) {
                    win = undefined;
                    _window_repository[index] = undefined;
                }
            }
        });
        if (options.url || (electron_main_electron_instance_1.ElectronInstance.getDto() && electron_main_electron_instance_1.ElectronInstance.getDto().window && electron_main_electron_instance_1.ElectronInstance.getDto().window.url)) {
            win.loadURL((electron_main_electron_instance_1.ElectronInstance.getDto() && electron_main_electron_instance_1.ElectronInstance.getDto().window && electron_main_electron_instance_1.ElectronInstance.getDto().window.url) ? electron_main_electron_instance_1.ElectronInstance.getDto().window.url : options.url);
        }
        else if (options.file) {
            win.loadFile(options.file);
        }
        ;
        return _window_repository[_window_repository.length - 1];
    }
    static getAll() {
        let windows = _window_repository.filter(w => {
            if (w)
                return true;
            else
                return false;
        });
        return windows;
    }
}
exports.BrowserWindow = BrowserWindow;
//# sourceMappingURL=electron-main.browser-window.js.map