import { Diagnostic, DiagnosticSeverity, Range, Position, DiagnosticRelatedInformation, Location } from 'vscode';
import { LINE, DESCRIPTION, PRIORITY, RULE_SET } from '../utils/constants';

export const createDiagnostic = (result: any): Diagnostic | null => {
  const line = parseInt(result[LINE]) - 1;
  if (isNaN(line)) { return null; }
  const ruleset = result[RULE_SET];
  const description = result[DESCRIPTION];
  const message = `${ruleset}: ${description}`;
  const priority = parseInt(result[PRIORITY]);
  let severity: DiagnosticSeverity;

  switch (priority) {
    case 1 || 2:
      severity = DiagnosticSeverity.Error;
      break;
    case 3:
      severity = DiagnosticSeverity.Warning;
      break;
    case 4: 
      severity = DiagnosticSeverity.Information;
      break;
    default:
      severity = DiagnosticSeverity.Hint;
      break;
  }

  const problem = new Diagnostic(
    new Range(new Position(line, 0), new Position(line, 100)),
    message,
    severity,
  );
  problem.source = 'APLint';
  
  return problem;
};