"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserWindow = void 0;
const path = require("path");
const electron_1 = require("electron");
const _window_repository = [];
class BrowserWindow extends electron_1.BrowserWindow {
    constructor(options) {
        super(options);
    }
    static create(options) {
        // check if node integration is enabled
        let nodeIntegration = false;
        if (options && options.webPreferences && options.webPreferences.nodeIntegration)
            nodeIntegration = true;
        if (!nodeIntegration) {
            if (options) {
                if (options.webPreferences) {
                    if (options.webPreferences) {
                        options.webPreferences.contextIsolation = true;
                        options.webPreferences.preload = path.join(__dirname, 'preload.js');
                    }
                    else {
                        options.webPreferences = {
                            contextIsolation: true,
                            preload: path.join(__dirname, 'preload.js')
                        };
                    }
                }
            }
            else {
                options = {
                    webPreferences: {
                        contextIsolation: true,
                        preload: path.join(__dirname, 'preload.js')
                    }
                };
            }
        }
        else {
            console.warn('nodeIntegration is enebled. If you want to use preloader please disable node integration');
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
//# sourceMappingURL=electron-main.browser-winsow.js.map