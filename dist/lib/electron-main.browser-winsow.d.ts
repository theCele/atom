import { BrowserWindow as BW, BrowserWindowConstructorOptions } from 'electron';
export declare class BrowserWindow extends BW {
    constructor(options?: BrowserWindowConstructorOptions);
    static create(options?: BrowserWindowConstructorOptions): BrowserWindow;
    static getAll(): BrowserWindow[];
}
