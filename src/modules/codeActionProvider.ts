import { 
  CodeActionProvider, 
  CodeActionKind, 
  TextDocument,
  Range,
  CodeAction, 
  DiagnosticCollection,
  Diagnostic } from 'vscode';

/**
 * A documentation provider for opening rule documentation 
 * as a code action on violated rules.
 * @author Gareth Sharpe
 * @implements {CodeActionProvider}
 * @class
 * @constructor 
 */
export class DocumentationProvider implements CodeActionProvider {

  private _collection: DiagnosticCollection;

  /**
   * Creates a documentation provider
   * @param {DiagnosticCollection} collection A collection of Diagnostics
   */
  constructor(collection: DiagnosticCollection) {
    this._collection = collection;
  }

	public static readonly providedCodeActionKinds = [
		CodeActionKind.QuickFix
  ];

  /**
   * Provides code actions for violated rules.
   * @author Gareth Sharpe
   * @public
   * @param {TextDocument} document The text document to provide code actions for
   * @param {Range} range The range to provide code actions for
   * @returns {CodeAction[] | undefined}
   */
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
  
  /**
   * Initiates the 'extension.APLint:OpenRuleDocumentation' command 
   * as a code action for violated rules.
   * @author Gareth Sharpe
   * @private
   * @param diagnostic A diagnostic containing information about rule violation
   * @returns {CodeAction}
   */
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
