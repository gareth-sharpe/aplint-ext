import * as vscode from 'vscode';
import { run } from './lib/run';

const supportedLanguageCodes = ['apex', 'visualforce'];
const isSupportedLanguage = (langCode: string) => 0 <= supportedLanguageCodes.indexOf(langCode);
const collection = vscode.languages.createDiagnosticCollection('aplint');
const outputChannel = vscode.window.createOutputChannel('APLint');

export function activate(context: vscode.ExtensionContext) {

  vscode.window.showInformationMessage('Congratulations, APLint is now active!');

	let aplintcommand = vscode.commands.registerCommand('extension.APLint:Run', async () => { 
		run(collection, outputChannel); 
	});
	let clearProblemsCommand = vscode.commands.registerCommand('extension.APLint:ClearProblems', () => {
		collection.clear();
	});

	vscode.workspace.onDidSaveTextDocument(async (textDocument) => { 
		if (isSupportedLanguage(textDocument.languageId)) {
			run(collection, outputChannel);
		}
	});
	vscode.window.onDidChangeActiveTextEditor((editor) => {
		if (isSupportedLanguage(editor!.document.languageId)) {
			run(collection, outputChannel);
		} 
	});

	context.subscriptions.push(aplintcommand);
	context.subscriptions.push(clearProblemsCommand);
}

export function deactivate() {}