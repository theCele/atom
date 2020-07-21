"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const controller_decorator_1 = require("./lib/controller.decorator");
let MainController = class MainController {
    constructor() {
    }
    methodOne(a, b) {
        console.log('a');
        console.log(a);
        console.log('b');
        console.log(b);
        return new Promise(resolve => {
            resolve('one');
        });
    }
    methodTwo() {
        return new Promise(resolve => {
            resolve('tqo');
        });
    }
    methodThree() {
    }
};
__decorate([
    controller_decorator_1.Ipc(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "methodOne", null);
__decorate([
    controller_decorator_1.Post(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainController.prototype, "methodTwo", null);
MainController = __decorate([
    controller_decorator_1.Controller('one'),
    __metadata("design:paramtypes", [])
], MainController);
exports.MainController = MainController;
//# sourceMappingURL=test.js.map