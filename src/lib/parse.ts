import { Diagnostic } from 'vscode';
import { createDiagnostic } from '../lib/diagnostics';
import { FILE } from '../utils/constants';

const parser = require('csv-string');

/**
 * Parses the CSV of the violated rule(s)
 * @author Gareth Sharpe
 * @param csv The comma seperated values of the violated rule(s)
 * @returns {Map<string, Array<Diagnostic>>}
 */
export const parseCSV = (csv: string): Map<string, Array<Diagnostic>> => {
  let results: [];

  results = parser.parse(csv);
  results.shift();

  const map = new Map<string, Array<Diagnostic>>();

  results.forEach((result) => {
    const problem = createDiagnostic(result);
    if (!problem) { return; }
    if (map.has(result[FILE])) {
      map.get(result[FILE])!.push(problem);
    } else {
      map.set(result[FILE], [problem]);
    }
  });
  return map;
};