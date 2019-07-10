import { FILE, DESCRIPTION, LINE, PRIORITY, RULE_SET, RULE } from '../../utils/constants';
import {
  CODE_STYLE,
  PARANTHASES_MUST_BE_FORMATTED_DESCRIPTION,
  PARANTHASES_MUST_BE_FORMATTED_RULE
} from '../../utils/constants';

/**
 * Lints a line for paranthase spacing.
 * @author Gareth Sharpe
 * @param {string} file the file currently being linted
 * @param {number} line the line to lint
 * @param {number} i the line number
 * @return {result}
 */
export const lintForParenthesisSpacing = (file: string, line: string, i: number): any[] => {
  if (!line.match(/^[^\/*]+(for|while|if|switch|else if)/g)) {
    return [];
  }
  const paranthasesMustHaveSpaceTest= /\s\(.*\)\s/g;
  const passesParanthasisMustHaveSpaceTest = paranthasesMustHaveSpaceTest.test(line);
  let results: any[] = [];
  if (!passesParanthasisMustHaveSpaceTest) {
    const result = {
      [FILE]: file,
      [PRIORITY]: 3,
      [LINE]: i,
      [DESCRIPTION]: PARANTHASES_MUST_BE_FORMATTED_DESCRIPTION,
      [RULE_SET]: CODE_STYLE,
      [RULE]: PARANTHASES_MUST_BE_FORMATTED_RULE,
    };
    results.push(result);
  }
  return results;
};