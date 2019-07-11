import { FILE, DESCRIPTION, LINE, PRIORITY, RULE_SET, RULE } from '../../utils/constants';
import {
  CODE_STYLE,
  SPACE_MUST_FOLLOW_COMMA_DESCRIPTION,
  SPACE_MUST_FOLLOW_COMMA_RULE
} from '../../utils/constants';

/**
 * Lints a line for extra spacing.
 * @author Gareth Sharpe
 * @param {string} file the file currently being linted
 * @param {number} line the line to lint
 * @param {number} i the line number
 * @return {result}
 */
export const lintForSpaceAfterComma = (file: string, line: string, i: number): any[] => {
  const spaceMustFollowComma = /[,][^\s]/g;
  const failsSpaceMustFollowCommaTest = spaceMustFollowComma.test(line);
  let results: any[] = [];
  if (failsSpaceMustFollowCommaTest) {
    const result = {
      [FILE]: file,
      [PRIORITY]: 3,
      [LINE]: i,
      [DESCRIPTION]: SPACE_MUST_FOLLOW_COMMA_DESCRIPTION,
      [RULE_SET]: CODE_STYLE,
      [RULE]: SPACE_MUST_FOLLOW_COMMA_RULE,
    };
    results.push(result);
  }
  return results;
};