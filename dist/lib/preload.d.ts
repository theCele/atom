export interface IIpcRenderer {
    invoke: (listeningChannel: string, ...args: any) => Promise<any>;
    send: (listeningChannel: string, ...args: any) => Promise<any>;
    on: (listeningChannel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => void;
}
