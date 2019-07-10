import { FILE, DESCRIPTION, LINE, PRIORITY, RULE_SET, RULE } from '../../utils/constants';
import {
  CODE_STYLE,
  MUST_NOT_HAVE_EXTRA_SPACING_DESCRIPTION,
  MUST_NOT_HAVE_EXTRA_SPACING_RULE
} from '../../utils/constants';

/**
 * Lints a line for extra spacing.
 * @author Gareth Sharpe
 * @param {string} file the file currently being linted
 * @param {number} line the line to lint
 * @param {number} i the line number
 * @return {result}
 */
export const lintForExtraSpacing = (file: string, line: string, i: number): any[] => {
  const mustNotHaveExtraSpacing = /[^(\s*)]( {2,})+?/g;
  const failsMustNotHaveExtraSpacing = mustNotHaveExtraSpacing.test(line);
  let results: any[] = [];
  if (failsMustNotHaveExtraSpacing) {
    const result = {
      [FILE]: file,
      [PRIORITY]: 3,
      [LINE]: i,
      [DESCRIPTION]: MUST_NOT_HAVE_EXTRA_SPACING_DESCRIPTION,
      [RULE_SET]: CODE_STYLE,
      [RULE]: MUST_NOT_HAVE_EXTRA_SPACING_RULE,
    };
    results.push(result);
  }
  return results;
};