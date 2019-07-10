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
const vscode_1 = require("vscode");
const exec_1 = require("./exec");
const parse_1 = require("./parse");
const lint_1 = require("./lint");
/**
 * Lints a file and displays violated rules as VSCode diagnostics in
 * the output terminal.
 * @author Gareth Sharpe
 * @param collection A collection used to store VSCode diagnostics
 * @param outputChannel An output channel to write to
 * @returns {Promise<void>}
 * @async
 */
exports.run = (collection, path) => __awaiter(this, void 0, void 0, function* () {
    const data = yield exec_1.execCmd(path);
    const problemsMap = parse_1.parseCSV(data);
    yield lint_1.lint(path, problemsMap);
    if (problemsMap.size > 0) {
        for (let [path, issues] of problemsMap) {
            let uri = vscode_1.Uri.file(path);
            let doc = yield vscode_1.workspace.openTextDocument(uri);
            issues.forEach(issue => {
                let line = doc.lineAt(issue.range.start.line);
                issue.range = new vscode_1.Range(new vscode_1.Position(line.range.start.line, line.firstNonWhitespaceCharacterIndex), line.range.end);
            });
            collection.set(uri, issues);
        }
    }
    return;
});
//# sourceMappingURL=run.js.map