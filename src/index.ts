import * as vscode from 'vscode';
import { run } from './lib/run';

const supportedLanguageCodes = ['apex', 'visualforce'];
const isSupportedLanguage = (langCode: string) => 0 <= supportedLanguageCodes.indexOf(langCode);
const collection = vscode.languages.createDiagnosticCollection('aplint');
const outputChannel = vscode.window.createOutputChannel('APLint');

export function activate(context: vscode.ExtensionContext) {

	let aplintCommand = vscode.commands.registerCommand('extension.APLint:Run', async () => {
		vscode.commands.executeCommand('extension.APLint:ClearProblems'); 
		run(collection, outputChannel); 
	});
	let clearProblemsCommand = vscode.commands.registerCommand('extension.APLint:ClearProblems', () => {
		collection.clear();
	});

	vscode.workspace.onDidSaveTextDocument(async (textDocument) => { 
		if (isSupportedLanguage(textDocument.languageId)) {
			vscode.commands.executeCommand('extension.APLint:ClearProblems');
			run(collection, outputChannel);
		}
	});
	vscode.window.onDidChangeActiveTextEditor((editor) => {
		if (isSupportedLanguage(editor!.document.languageId)) {
			vscode.commands.executeCommand('extension.APLint:ClearProblems');
			run(collection, outputChannel);
		} 
	});

	context.subscriptions.push(aplintCommand);
	context.subscriptions.push(clearProblemsCommand);
}

export function deactivate() {}