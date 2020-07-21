"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
require("reflect-metadata");
function Module(options) {
    return function classDecorator(constructor) {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.controllersSignitures = (options) ? (options.controllers ? options.controllers : []) : [];
                this.controllers = (options) ? ((options.controllers) ? options.controllers.map(c => new c()) : []) : [];
                this.children = (options) ? ((options.children) ? options.children.map(m => new m()) : []) : [];
            }
        };
    };
}
exports.Module = Module;
//# sourceMappingURL=module.decorator.js.map