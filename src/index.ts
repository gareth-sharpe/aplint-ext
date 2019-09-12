import { commands, window, workspace, languages, ExtensionContext } from 'vscode';
import { run } from './lib/run';
import { openRule } from './lib/open';
import { previewDoc } from './lib/preview';
import { DocumentationProvider } from './modules/codeActionProvider';

const supportedLanguageCodes = ['apex', 'visualforce'];
const isSupportedLanguage = (langCode: string) => 0 <= supportedLanguageCodes.indexOf(langCode);
const collection = languages.createDiagnosticCollection('aplint');
// const outputChannel = window.createOutputChannel('APLint');

export function activate(context: ExtensionContext) {

	const aplintFileCommand = commands.registerCommand(
		'extension.APLint:RunOnFile', async () => {
		commands.executeCommand('extension.APLint:ClearProblems');
		const currentPath = window.activeTextEditor!.document.fileName; 
		run(collection, currentPath); 
	});
	const aplintDirectoryCommand = commands.registerCommand(
		'extension.APLint:RunOnDirectory', async () => {
		commands.executeCommand('extension.APLint:ClearProblems');
		const currentPath = window.activeTextEditor!.document.fileName;
		const i = currentPath.lastIndexOf('/');
		const path = currentPath.slice(0, i);
		run(collection, path); 
	});
	const clearProblemsCommand = commands.registerCommand(
		'extension.APLint:ClearProblems', () => {
		collection.clear();
	});
	const openRuleDocumentationCommand = commands.registerCommand(
		'extension.APLint:OpenRuleDocumentation', (diagnostic) => {
			openRule(diagnostic);
	});
	const openPreviewDocumentationCommand = commands.registerCommand(
		'extension.APLint:PreviewDocumentation', (diagnostic) => {
			const currentPath = window.activeTextEditor!.document.fileName;
			const i = currentPath.lastIndexOf('/');
			const path = currentPath.slice(0, i);
			previewDoc(path);
	});

	workspace.onDidSaveTextDocument((textDocument) => { 
		if (isSupportedLanguage(textDocument.languageId)) {
			// commands.executeCommand('extension.APLint:ClearProblems');
			const currentPath = window.activeTextEditor!.document.fileName; 
			run(collection, currentPath);
		}
	});
	window.onDidChangeActiveTextEditor((editor) => {
		if (isSupportedLanguage(editor!.document.languageId)) {
			// commands.executeCommand('extension.APLint:ClearProblems');
			const currentPath = window.activeTextEditor!.document.fileName; 
			run(collection, currentPath);
		} 
	});

	const openRuleDescription = languages.registerCodeActionsProvider(
		'apex',
		new DocumentationProvider(collection),
		{ providedCodeActionKinds: DocumentationProvider.providedCodeActionKinds },
	);

	context.subscriptions.push(
		aplintFileCommand,
		aplintDirectoryCommand,
		clearProblemsCommand,
		openRuleDocumentationCommand,
		openRuleDescription,
		openPreviewDocumentationCommand
	);
}

export function deactivate() {}