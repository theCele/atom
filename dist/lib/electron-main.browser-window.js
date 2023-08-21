"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserWindow = void 0;
const path = require("path");
const electron_1 = require("electron");
const electron_main_electron_instance_1 = require("./electron-main.electron-instance");
// let BrowserWindowConstructorOptions;
const _window_repository = new Map();
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
                    preload: options.webPreferences ? (options.webPreferences.preload ? options.webPreferences.preload : path.join(__dirname, 'preload.js')) : path.join(__dirname, 'preload.js')
                }
            };
            options = { ...options, ...preloadOptions };
        }
        else {
            console.warn('nodeIntegration is enabled. If you want to use IpcClient please disable node integration');
        }
        const win = new BrowserWindow(options);
        _window_repository.set(win.id, win);
        win.on('close', () => {
            if (win) {
                _window_repository.delete(win.id);
            }
        });
        if (options.url || (electron_main_electron_instance_1.ElectronInstance.getDto() && electron_main_electron_instance_1.ElectronInstance.getDto().window && electron_main_electron_instance_1.ElectronInstance.getDto().window.url)) {
            win.loadURL((electron_main_electron_instance_1.ElectronInstance.getDto() && electron_main_electron_instance_1.ElectronInstance.getDto().window && electron_main_electron_instance_1.ElectronInstance.getDto().window.url) ? electron_main_electron_instance_1.ElectronInstance.getDto().window.url : options.url);
        }
        else if (options.file) {
            win.loadFile(options.file);
        }
        ;
        return win;
    }
    static getAll() {
        let windows;
        for (const iterator of _window_repository.values()) {
            windows.push(iterator);
        }
        return windows;
    }
}
exports.BrowserWindow = BrowserWindow;
//# sourceMappingURL=electron-main.browser-window.js.map