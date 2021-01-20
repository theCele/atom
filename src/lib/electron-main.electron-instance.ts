import { exec, ChildProcess } from 'child_process'
import { IBrowserWindowConstructorOptions } from './electron-main.browser-window'

export class ElectronInstance {
    private static arg: any[] = [];
    static create<T>(dto?: { data?: T, window?: IBrowserWindowConstructorOptions }): ChildProcess {
        this.arg = process.argv;
        const appPath: string = this.arg[0];
        const scriptPath: string = this.arg[1] ? this.arg[1] : '';
        
        const env = {...process.env};
        if (dto) env.DTO = JSON.stringify(dto);
        
        let cp = exec(`${appPath} ${scriptPath}`, { env: env }, (err, stout, stderr) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(stout);
            console.log(stderr);
        });
        
        cp.stdout.on('data', (chunk: any) => {
            console.log(chunk);
        });
        cp.stderr.on('data', (chunk: any) => {
            console.log(chunk);
        });
        return cp;
    }
    static getDto<T>(): T | undefined {
        let dto: T | undefined = undefined;
        try {
            dto = JSON.parse((process.env.DTO as any).data);
        } catch (err) { }
        return dto;
    }
}