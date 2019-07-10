
import { makeResult } from '../result';
import {
  CODE_STYLE,
  BRACES_MUST_BE_FORMATTED_DESCRIPTION,
  BRACES_MUST_BE_FORMATTED_RULE
} from '../../utils/constants';

/**
 * Lints a class line for brace spacing.
 * @author Gareth Sharpe
 * @param {string} file the file currently being linted
 * @param {number} line the line to lint
 * @param {number} i the line number
 * @return {result}
 */
export const lintForClassBraceSpacing = (file: string, line: string, i: number): any[] => {
  if (!line.includes('class')) {
    return [];
  }
  const bracesMustHaveSpaceTest = /class \w* {/g;
  const passesBracesMustHaveSpaceTest = bracesMustHaveSpaceTest.test(line);
  let results: any[] = [];
  if (!passesBracesMustHaveSpaceTest) {
    const result = makeResult(
      file,
      3,
      i,
      CODE_STYLE,
      BRACES_MUST_BE_FORMATTED_DESCRIPTION,
      BRACES_MUST_BE_FORMATTED_RULE
    );
    results.push(result);
  }
  return results;
};

/**
 * Lints a line for brace spacing.
 * @author Gareth Sharpe
 * @param {string} file the file currently being linted
 * @param {number} line the line to lint
 * @param {number} i the line number
 * @return {result}
 */
export const lintForBraceSpacing = (file: string, line: string, i: number): any[] => {
  const isNotClassInstantiation = /\(.*\)[^;]/g;
  if (!isNotClassInstantiation.test(line)) {
    return [];
  }
  const bracesMustHaveSpaceTest = /\(.*\) {/g;
  const passesBracesMustHaveSpaceTest = bracesMustHaveSpaceTest.test(line);
  let results: any[] = [];
  if (!passesBracesMustHaveSpaceTest) {
    const result = makeResult(
      file,
      3,
      i,
      CODE_STYLE,
      BRACES_MUST_BE_FORMATTED_DESCRIPTION,
      BRACES_MUST_BE_FORMATTED_RULE
    );
    results.push(result);
  }
  return results;
};