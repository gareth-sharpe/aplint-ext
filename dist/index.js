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
const vscode = require("vscode");
const run_1 = require("./lib/run");
const supportedLanguageCodes = ['apex', 'visualforce'];
const isSupportedLanguage = (langCode) => 0 <= supportedLanguageCodes.indexOf(langCode);
const collection = vscode.languages.createDiagnosticCollection('aplint');
const outputChannel = vscode.window.createOutputChannel('APLint');
function activate(context) {
    vscode.window.showInformationMessage('Congratulations, APLint is now active!');
    let aplintcommand = vscode.commands.registerCommand('extension.APLint:Run', () => __awaiter(this, void 0, void 0, function* () {
        run_1.run(collection, outputChannel);
    }));
    let clearProblemsCommand = vscode.commands.registerCommand('extension.APLint:ClearProblems', () => {
        collection.clear();
    });
    vscode.workspace.onDidSaveTextDocument((textDocument) => __awaiter(this, void 0, void 0, function* () {
        if (isSupportedLanguage(textDocument.languageId)) {
            run_1.run(collection, outputChannel);
        }
    }));
    vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (isSupportedLanguage(editor.document.languageId)) {
            run_1.run(collection, outputChannel);
        }
    });
    context.subscriptions.push(aplintcommand);
    context.subscriptions.push(clearProblemsCommand);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=index.js.map