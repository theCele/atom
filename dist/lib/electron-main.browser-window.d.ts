import { BrowserWindow as BW, BrowserWindowConstructorOptions } from 'electron';
declare let BrowserWindowConstructorOptions: any;
export interface IBrowserWindowConstructorOptions extends BrowserWindowConstructorOptions {
    url?: string;
    file?: string;
}
export declare class BrowserWindow extends BW {
    constructor(options?: IBrowserWindowConstructorOptions);
    static create(options?: IBrowserWindowConstructorOptions): BrowserWindow;
    static getAll(): BrowserWindow[];
}
export {};
