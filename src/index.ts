import * as vscode from 'vscode';
import { run } from './lib/run';
import { openRule } from './lib/open';
import { DocumentationProvider } from './modules/codeActionProvider';

const supportedLanguageCodes = ['apex', 'visualforce'];
const isSupportedLanguage = (langCode: string) => 0 <= supportedLanguageCodes.indexOf(langCode);
const collection = vscode.languages.createDiagnosticCollection('aplint');
const outputChannel = vscode.window.createOutputChannel('APLint');

export function activate(context: vscode.ExtensionContext) {

	const aplintCommand = vscode.commands.registerCommand(
		'extension.APLint:Run', async () => {
		vscode.commands.executeCommand('extension.APLint:ClearProblems'); 
		run(collection, outputChannel); 
	});
	const clearProblemsCommand = vscode.commands.registerCommand(
		'extension.APLint:ClearProblems', () => {
		collection.clear();
	});
	const openRuleDocumentationCommand = vscode.commands.registerCommand(
		'extension.APLint:OpenRuleDocumentation', (diagnostic) => {
			openRule(diagnostic);
	});

	vscode.workspace.onDidSaveTextDocument((textDocument) => { 
		if (isSupportedLanguage(textDocument.languageId)) {
			// vscode.commands.executeCommand('extension.APLint:ClearProblems');
			run(collection, outputChannel);
		}
	});
	vscode.window.onDidChangeActiveTextEditor((editor) => {
		if (isSupportedLanguage(editor!.document.languageId)) {
			// vscode.commands.executeCommand('extension.APLint:ClearProblems');
			run(collection, outputChannel);
		} 
	});

	const openRuleDescription = vscode.languages.registerCodeActionsProvider(
		'apex',
		new DocumentationProvider(collection),
		{ providedCodeActionKinds: DocumentationProvider.providedCodeActionKinds },
	);

	context.subscriptions.push(
		aplintCommand,
		clearProblemsCommand,
		openRuleDocumentationCommand,
		openRuleDescription);
}

export function deactivate() {}