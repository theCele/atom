import { BrowserWindow as BW, BrowserWindowConstructorOptions } from 'electron';
export interface IBrowserWindowConstructorOptions extends BrowserWindowConstructorOptions {
    url?: string;
    file?: string;
}
export declare class BrowserWindow extends BW {
    constructor(options?: IBrowserWindowConstructorOptions);
    static create(options?: IBrowserWindowConstructorOptions): BrowserWindow;
    static getAll(): BrowserWindow[];
}
