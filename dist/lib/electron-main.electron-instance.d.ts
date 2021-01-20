/// <reference types="node" />
import { ChildProcess } from 'child_process';
import { IBrowserWindowConstructorOptions } from './electron-main.browser-window';
export declare class ElectronInstance {
    private static arg;
    static create<T>(dto?: {
        data?: T;
        window?: IBrowserWindowConstructorOptions;
    }): ChildProcess;
    static getDto<T>(): T | undefined;
}
