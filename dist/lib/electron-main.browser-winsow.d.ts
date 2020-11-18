import { BrowserWindow as BW, BrowserWindowConstructorOptions } from 'electron';
declare let BrowserWindowConstructorOptions: any;
export declare class BrowserWindow extends BW {
    constructor(options?: BrowserWindowConstructorOptions);
    static create(options?: BrowserWindowConstructorOptions): BrowserWindow;
    static getAll(): BrowserWindow[];
}
export {};
