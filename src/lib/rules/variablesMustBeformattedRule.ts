import { FILE, DESCRIPTION, LINE, PRIORITY, RULE_SET, RULE } from '../../utils/constants';
import {
  CODE_STYLE,
  VARIABLES_MUST_BE_FORMATED_DESCRIPTION,
  VARIABLES_MUST_BE_FORMATED_RULE
} from '../../utils/constants';

/**
 * Lints a line for improper spacing.
 * @author Gareth Sharpe
 * @param {string} file the file currently being linted
 * @param {number} line the line to lint
 * @param {number} i the line number
 * @return {result}
 */
export const lintForVariableSpacing = (file: string, line: string, i: number): any[] => {
  const isClassInstantiation = /\(.*\)[;]/g;
  if (isClassInstantiation.test(line) || !line.match(/^[^\/*]+(while|if|else if)/g)) {
    return [];
  }
  const varaiblesMustHaveSpaceTest = /\([!]?([a-zA-Z0-9.]+(\+\+|--)?|[a-zA-Z0-9.]+(\+\+|--)?(\s[-\+&|=*%]+\s[!]?[a-zA-Z0-9.]+(\+\+|--)?)+)\)/g;
  const passesVariablesMustHaveSpaceTest = varaiblesMustHaveSpaceTest.test(line);
  let results: any[] = [];
  if (!passesVariablesMustHaveSpaceTest) {
    const result = {
      [FILE]: file,
      [PRIORITY]: 3,
      [LINE]: i,
      [DESCRIPTION]: VARIABLES_MUST_BE_FORMATED_DESCRIPTION,
      [RULE_SET]: CODE_STYLE,
      [RULE]: VARIABLES_MUST_BE_FORMATED_RULE,
    };
    results.push(result);
  }
  return results;
};