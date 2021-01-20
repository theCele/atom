export declare const isMain: () => boolean;
export declare const ipc: {
    invoke<T>(controllerName: string, methodName: string, ...args: any): Promise<T>;
};
export declare const preload: () => void;
