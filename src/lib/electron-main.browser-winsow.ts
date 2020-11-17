import { BrowserWindow as BW, BrowserWindowConstructorOptions } from 'electron';
const _window_repository: BrowserWindow[] = [];

export class BrowserWindow extends BW {
    constructor(options?: BrowserWindowConstructorOptions) {
        super(options);   
    }

    public static create(options?: BrowserWindowConstructorOptions) {
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