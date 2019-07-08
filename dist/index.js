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
const run_1 = require("./lib/run");
const open_1 = require("./lib/open");
const codeActionProvider_1 = require("./modules/codeActionProvider");
const supportedLanguageCodes = ['apex', 'visualforce'];
const isSupportedLanguage = (langCode) => 0 <= supportedLanguageCodes.indexOf(langCode);
const collection = vscode_1.languages.createDiagnosticCollection('aplint');
// const outputChannel = window.createOutputChannel('APLint');
function activate(context) {
    const aplintFileCommand = vscode_1.commands.registerCommand('extension.APLint:RunOnFile', () => __awaiter(this, void 0, void 0, function* () {
        vscode_1.commands.executeCommand('extension.APLint:ClearProblems');
        const currentPath = vscode_1.window.activeTextEditor.document.fileName;
        run_1.run(collection, currentPath);
    }));
    const aplintDirectoryCommand = vscode_1.commands.registerCommand('extension.APLint:RunOnDirectory', () => __awaiter(this, void 0, void 0, function* () {
        vscode_1.commands.executeCommand('extension.APLint:ClearProblems');
        const currentPath = vscode_1.window.activeTextEditor.document.fileName;
        const i = currentPath.lastIndexOf('/');
        const path = currentPath.slice(0, i);
        run_1.run(collection, path);
    }));
    const clearProblemsCommand = vscode_1.commands.registerCommand('extension.APLint:ClearProblems', () => {
        collection.clear();
    });
    const openRuleDocumentationCommand = vscode_1.commands.registerCommand('extension.APLint:OpenRuleDocumentation', (diagnostic) => {
        open_1.openRule(diagnostic);
    });
    vscode_1.workspace.onDidSaveTextDocument((textDocument) => {
        if (isSupportedLanguage(textDocument.languageId)) {
            // vscode.commands.executeCommand('extension.APLint:ClearProblems');
            const currentPath = vscode_1.window.activeTextEditor.document.fileName;
            run_1.run(collection, currentPath);
        }
    });
    vscode_1.window.onDidChangeActiveTextEditor((editor) => {
        if (isSupportedLanguage(editor.document.languageId)) {
            // vscode.commands.executeCommand('extension.APLint:ClearProblems');
            const currentPath = vscode_1.window.activeTextEditor.document.fileName;
            run_1.run(collection, currentPath);
        }
    });
    const openRuleDescription = vscode_1.languages.registerCodeActionsProvider('apex', new codeActionProvider_1.DocumentationProvider(collection), { providedCodeActionKinds: codeActionProvider_1.DocumentationProvider.providedCodeActionKinds });
    context.subscriptions.push(aplintFileCommand, aplintDirectoryCommand, clearProblemsCommand, openRuleDocumentationCommand, openRuleDescription);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=index.js.map