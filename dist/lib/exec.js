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
const vscode_1 = require("vscode");
const fs = require('fs');
/**
 * Executes the PMD linting shell/bash command with given paramaters.
 * @author Gareth Sharpe
 * @param {string} path The path to the directory to lint
 * @param {CancellationToken} token The token to use to identify exec cancellation
 * @return {Promise<string>}
 * @async
 */
exports.execCmd = (path, token) => __awaiter(this, void 0, void 0, function* () {
    const dir = __dirname;
    console.log('dir', dir);
    let configuredRulesets = vscode_1.workspace.getConfiguration().get('aplint.customRulesets');
    const isWin = process.platform === 'win32';
    console.log('isWin', isWin);
    const manulifeConfiguration = isWin ?
        `${dir}\\..\\config\\manulife` :
        `${dir}/../config/manulife`;
    console.log('configuration', manulifeConfiguration);
    const files = yield fs.readdirSync(manulifeConfiguration);
    let rulesets = isWin ?
        `-R ${dir}\\..\\ruleset.xml` :
        `-R ${dir}/../ruleset.xml`;
    console.log('rulesets', rulesets);
    files.forEach((file) => {
        const path = isWin ?
            `,${manulifeConfiguration}\\${file}` :
            `,${manulifeConfiguration}/${file}`;
        console.log('path', path);
        rulesets = rulesets.concat(path);
    });
    const targetFlag = `-d ${path}`;
    const rulesetFlag = configuredRulesets.length ?
        `-R ${configuredRulesets}` :
        rulesets;
    const formatFlag = `-f csv`;
    const cmdArgs = `${targetFlag} ${rulesetFlag} ${formatFlag}`;
    console.log('args', cmdArgs);
    const cmd = isWin ?
        `${dir}\\..\\pmd-bin-6.16.0\\bin\\pmd.bat ${cmdArgs}` :
        `${dir}/../pmd-bin-6.16.0/bin/run.sh pmd ${cmdArgs}`;
    console.log('cmd', cmd);
    let spawn;
    try {
        spawn = child_process_1.exec(cmd);
        console.log('spawn', spawn);
    }
    catch (e) {
        console.log('e', e);
    }
    let data = '';
    data = yield new Promise((resolve, reject) => {
        spawn.stdout.on('data', (line) => {
            console.log('line', line);
            data += line;
        });
        spawn.stderr.on('data', (message) => {
            console.log('stderr message', message);
        });
        spawn.addListener('error', (e) => {
            console.log('error', e);
            reject('APLint failed on error.');
        });
        spawn.addListener('exit', (e) => {
            if (e !== 0 && e !== 4) {
                console.log('e', e);
                console.log('data', data);
                reject('APLint failed on exit.');
            }
            resolve(data);
        });
    });
    return data;
});
//# sourceMappingURL=exec.js.map