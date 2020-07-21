import 'reflect-metadata';

interface IModuleOptions {
    controllers?: any [],
    children?: any []
}

export function Module(options?: IModuleOptions) {
    return function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
        return class extends constructor {
            controllersSignitures: any [] = (options) ? (options.controllers ? options.controllers : []) : [];
            controllers: any [] = (options) ? ((options.controllers) ? options.controllers.map(c => new c()) : []) : [];
            children: any [] = (options) ? ((options.children) ? options.children.map(m => new m()) : []) : [];
        }
    }
}