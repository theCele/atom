"use strict";
// import { TestController } from "./test/test-module/test.controller";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
console.log('TestController');
const test_1 = require("./test");
class TestClass extends test_1.MainController {
    constructor() {
        super();
    }
}
let test = new TestClass();
// console.log(test.methodOne('aaaa','bbbb'));
// console.log(test.methodTwo());
exports.app = async () => {
    console.log(await test.methodOne('aaaa', 'bbbb'));
    // console.log(await test.methodTwo());
    // ipcRenderer.invoke('post:MainController/methodOne')
    // .then(r => console.log(r))
    // .catch(err => console.log(err));
};
exports.app();
// let testController = new TestController('');
// testController.getAll(undefined, {a: 'cele'})
// .then(r => console.log(r))
// .catch(err => console.log(err));
//# sourceMappingURL=renderer.js.map