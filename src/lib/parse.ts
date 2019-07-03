import { Diagnostic } from 'vscode';
import { createDiagnostic } from '../lib/diagnostics';
import { FILE } from '../utils/constants';

const parser = require('csv-string');

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