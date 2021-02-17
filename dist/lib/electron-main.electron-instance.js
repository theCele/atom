"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElectronInstance = void 0;
const child_process_1 = require("child_process");
class ElectronInstance {
    static create(dto) {
        this.arg = process.argv;
        const appPath = this.arg[0];
        const scriptPath = this.arg[1] ? this.arg[1] : '';
        const env = { ...process.env };
        if (dto)
            env.DTO = JSON.stringify(dto);
        let cp = child_process_1.exec(`${appPath} ${scriptPath}`, { env: env }, (err, stout, stderr) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(stout);
            console.log(stderr);
        });
        cp.stdout.on('data', (chunk) => {
            console.log(chunk);
        });
        cp.stderr.on('data', (chunk) => {
            console.log(chunk);
        });
        return cp;
    }
    static getDto() {
        let dto = undefined;
        try {
            dto = JSON.parse(process.env.DTO);
        }
        catch (err) { }
        return dto;
    }
}
exports.ElectronInstance = ElectronInstance;
ElectronInstance.arg = [];
//# sourceMappingURL=electron-main.electron-instance.js.map