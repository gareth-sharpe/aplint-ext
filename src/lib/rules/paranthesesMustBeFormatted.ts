import { FILE, DESCRIPTION, LINE, PRIORITY, RULE_SET, RULE } from '../../utils/constants';
import {
  CODE_STYLE,
  PARANTHESES_MUST_BE_FORMATTED_DESCRIPTION,
  PARANTHESES_MUST_BE_FORMATTED_RULE
} from '../../utils/constants';

/**
 * Lints a line for parentheses spacing.
 * @author Gareth Sharpe
 * @param {string} file the file currently being linted
 * @param {number} line the line to lint
 * @param {number} i the line number
 * @return {result}
 */
export const lintForParenthesesSpacing = (file: string, line: string, i: number): any[] => {
  if (!line.match(/^[^\/*]+(for|while|if|switch|else if)/g)) {
    return [];
  }
  const paranthesesMustHaveSpaceTest= /\s\(.*\)\s/g;
  const passesParanthesesMustHaveSpaceTest = paranthesesMustHaveSpaceTest.test(line);
  let results: any[] = [];
  if (!passesParanthesesMustHaveSpaceTest) {
    const result = {
      [FILE]: file,
      [PRIORITY]: 3,
      [LINE]: i,
      [DESCRIPTION]: PARANTHESES_MUST_BE_FORMATTED_DESCRIPTION,
      [RULE_SET]: CODE_STYLE,
      [RULE]: PARANTHESES_MUST_BE_FORMATTED_RULE,
    };
    results.push(result);
  }
  return results;
};