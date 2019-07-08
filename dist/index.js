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
const open_1 = require("./lib/open");
const codeActionProvider_1 = require("./modules/codeActionProvider");
const supportedLanguageCodes = ['apex', 'visualforce'];
const isSupportedLanguage = (langCode) => 0 <= supportedLanguageCodes.indexOf(langCode);
const collection = vscode.languages.createDiagnosticCollection('aplint');
const outputChannel = vscode.window.createOutputChannel('APLint');
function activate(context) {
    const aplintCommand = vscode.commands.registerCommand('extension.APLint:Run', () => __awaiter(this, void 0, void 0, function* () {
        vscode.commands.executeCommand('extension.APLint:ClearProblems');
        run_1.run(collection, outputChannel);
    }));
    const clearProblemsCommand = vscode.commands.registerCommand('extension.APLint:ClearProblems', () => {
        collection.clear();
    });
    const openRuleDocumentationCommand = vscode.commands.registerCommand('extension.APLint:OpenRuleDocumentation', (diagnostic) => {
        open_1.openRule(diagnostic);
    });
    vscode.workspace.onDidSaveTextDocument((textDocument) => {
        if (isSupportedLanguage(textDocument.languageId)) {
            // vscode.commands.executeCommand('extension.APLint:ClearProblems');
            run_1.run(collection, outputChannel);
        }
    });
    vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (isSupportedLanguage(editor.document.languageId)) {
            // vscode.commands.executeCommand('extension.APLint:ClearProblems');
            run_1.run(collection, outputChannel);
        }
    });
    const openRuleDescription = vscode.languages.registerCodeActionsProvider('apex', new codeActionProvider_1.DocumentationProvider(collection), { providedCodeActionKinds: codeActionProvider_1.DocumentationProvider.providedCodeActionKinds });
    context.subscriptions.push(aplintCommand, clearProblemsCommand, openRuleDocumentationCommand, openRuleDescription);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=index.js.map