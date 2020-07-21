import 'reflect-metadata';
interface IModuleOptions {
    controllers?: any[];
    children?: any[];
}
export declare function Module(options?: IModuleOptions): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        controllersSignitures: any[];
        controllers: any[];
        children: any[];
    };
} & T;
export {};
