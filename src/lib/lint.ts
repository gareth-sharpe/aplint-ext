import { Diagnostic } from 'vscode';
import { createDiagnostic } from './diagnostics';
import { FILE } from '../utils/constants';
import { 
  lintForBraceSpacing,
  lintForClassBraceSpacing } from './rules/bracesMustBeformattedRule';
import { lintForParenthesisSpacing } from './rules/paranthasisMustBeFormattedRule';
import { lintForVariableSpacing } from './rules/variablesMustBeformattedRule';
import { lintForSpaceAfterComma } from './rules/spaceMustFollowCommaRule';
import { lintForLoopSpacing } from './rules/loopsMustHaveFormattedSpacingRule';
import { lintForExtraSpacing } from './rules/mustNotHaveExtraSpacingRule';

const { createReadStream } = require('fs');
const { createInterface } = require('readline');

/**
 * Lints a file and creates a diagnostic map.
 * @author Gareth Sharpe
 * @param {string} path path to the file to lint
 * @param {Map<string, Array<Diagnostic>>} map a map of diagnostics
 */
export const lint = async (path: string, map: Map<string, Array<Diagnostic>>) => {
  let allResults: any[] = [];
  await new Promise((resolve, reject) => {
    const rl = createInterface({
      input: createReadStream(path),
      crlfDelay: Infinity
    });
    let i = 0;
    
    rl.on('line', (line: string) => {
      i++;
      const classBraceSpacingresults = lintForClassBraceSpacing(path, line, i);
      const variableSpacingResults = lintForVariableSpacing(path, line, i);
      const braceSpacingResults = lintForBraceSpacing(path, line, i);
      const parathaseSpacingResults = lintForParenthesisSpacing(path, line, i);
      const spaceAfterCommaResults = lintForSpaceAfterComma(path, line, i);
      const loopsSpacingResults = lintForLoopSpacing(path, line, i);
      const noExtraSpacing = lintForExtraSpacing(path, line, i);
      allResults = allResults.concat(
        variableSpacingResults,
        classBraceSpacingresults,
        braceSpacingResults,
        parathaseSpacingResults,
        spaceAfterCommaResults,
        loopsSpacingResults,
        noExtraSpacing);
    });
    rl.on('close', resolve);
  });
  allResults.forEach((result) => {
    const problem = createDiagnostic(result);
    if (map.has(result[FILE])) {
      map.get(result[FILE])!.push(problem!);
    } else {
      map.set(result[FILE], [problem!]);
    }
  });
  return;
};





