import { 
  CodeActionProvider, 
  CodeActionKind, 
  TextDocument,
  Range,
  CodeAction, 
  DiagnosticCollection,
  Diagnostic } from 'vscode';

export class DocumentationProvider implements CodeActionProvider {

  private _collection: DiagnosticCollection;

  constructor(collection: DiagnosticCollection) {
    this._collection = collection;
  }

	public static readonly providedCodeActionKinds = [
		CodeActionKind.QuickFix
  ];

	public provideCodeActions(document: TextDocument, range: Range): CodeAction[] | undefined {
    const { uri } = document;
    const diagnostics = this._collection.get(uri);
    const aplitDiagnostics = diagnostics!.filter(
      (diagnostic) => diagnostic.source === 'APLint');
    if (!aplitDiagnostics.length) { return; }
    const anchoredDiagnostic = aplitDiagnostics.filter(
      (diagnostic) => diagnostic.range.contains(range));
    if (!anchoredDiagnostic.length) { return; }
    const openDocumentation = this.openDocumentation(anchoredDiagnostic[0]);
    return [openDocumentation];
  }
  
  private openDocumentation(diagnostic: Diagnostic): CodeAction {
    const fix = new CodeAction('Open rule documentation', CodeActionKind.QuickFix);
    fix.command = { 
      title: 'Open Rule Documentation',
      command: 'extension.APLint:OpenRuleDocumentation',
      arguments: [diagnostic]  
    };
    return fix;
  }
}
