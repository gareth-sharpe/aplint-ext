import { Diagnostic, DiagnosticSeverity, Range, Position } from 'vscode';
import { LINE, DESCRIPTION, PRIORITY } from '../utils/constants';

export const createDiagnostic = (result: any): Diagnostic | null => {
  const line = parseInt(result[LINE]) - 1;
  if (isNaN(line)) { return null; }
  const description = result[DESCRIPTION];
  const priority = parseInt(result[PRIORITY]);
  let level: DiagnosticSeverity;

  switch (priority) {
    case 1 || 2:
      level = DiagnosticSeverity.Error;
      break;
    case 3:
      level = DiagnosticSeverity.Warning;
      break;
    case 4: 
      level = DiagnosticSeverity.Information;
      break;
    default:
      level = DiagnosticSeverity.Hint;
      break;
  }

  const problem = new Diagnostic(
    new Range(new Position(line, 0), new Position(line, 100)),
    description,
    level,
  );
  problem.source = 'APLint';
  
  return problem;
};