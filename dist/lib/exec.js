"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
exports.execCmd = (path, token) => __awaiter(this, void 0, void 0, function* () {
    const dir = __dirname;
    const targetFlag = `-d ${path}`;
    const rulesetFlag = `-R ${dir}/../../ruleset.xml`;
    const formatFlag = `-f csv`;
    const cmdArgs = `${targetFlag} ${rulesetFlag} ${formatFlag}`;
    const cmd = `${dir}/../../pmd-bin-6.16.0/bin/run.sh pmd ${cmdArgs}`;
    const process = child_process_1.exec(cmd);
    let data = '';
    data = yield new Promise((resolve, reject) => {
        process.stdout.on('data', (line) => {
            data += line;
        });
        process.addListener('exit', (e) => {
            if (e !== 0 && e !== 4) {
                reject('APLint failed.');
            }
            resolve(data);
        });
    });
    return data;
});
//# sourceMappingURL=exec.js.map