import { Uri, workspace, window, Range, Position, DiagnosticCollection, OutputChannel } from 'vscode';
import { execCmd } from './exec';
import { parseCSV } from './parse';

export const run = async (collection: DiagnosticCollection, outputChannel: OutputChannel): Promise<void> => {
  const currentPath = window.activeTextEditor!.document.fileName;
  const data = await execCmd(currentPath);
  const problemsMap = parseCSV(data);
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