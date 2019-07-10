import { Uri, workspace, Range, Position, DiagnosticCollection, OutputChannel } from 'vscode';
import { execCmd } from './exec';
import { parseCSV } from './parse';
import { lint } from './lint';

/**
 * Lints a file and displays violated rules as VSCode diagnostics in
 * the output terminal.
 * @author Gareth Sharpe
 * @param collection A collection used to store VSCode diagnostics
 * @param outputChannel An output channel to write to
 * @returns {Promise<void>}
 * @async
 */
export const run = async (collection: DiagnosticCollection, path: string): Promise<void> => {
  const data = await execCmd(path);
  const problemsMap = parseCSV(data);
  await lint(path, problemsMap);
  if (problemsMap.size > 0) {
    for (let [path, issues] of problemsMap) {
      let uri = Uri.file(path);
      let doc = await workspace.openTextDocument(uri);
      issues.forEach(issue => {
        let line = doc.lineAt(issue.range.start.line);
        issue.range = new Range(
          new Position(line.range.start.line, line.firstNonWhitespaceCharacterIndex),
          line.range.end,
        );
      });
      collection.set(uri, issues);
    }
  }
  return;
};