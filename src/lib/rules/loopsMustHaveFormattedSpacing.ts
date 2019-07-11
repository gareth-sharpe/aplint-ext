import { FILE, DESCRIPTION, LINE, PRIORITY, RULE_SET, RULE } from '../../utils/constants';
import {
  CODE_STYLE,
  LOOPS_MUST_HAVE_FORMATTED_SPACING_DESCRIPTION,
  LOOPS_MUST_HAVE_FORMATTED_SPACING_RULE
} from '../../utils/constants';

/**
 * Lints a line for spacing inside loops.
 * @author Gareth Sharpe
 * @param {string} file the file currently being linted
 * @param {number} line the line to lint
 * @param {number} i the line number
 * @return {result}
 */
export const lintForLoopSpacing = (file: string, line: string, i: number): any[] => {
  const isClassInstantiation = /\(.*\)[;]/g;
  if (isClassInstantiation.test(line) || !line.match(/^[^\/*]+(while|for)/g)) {
    return [];
  }
  const loopsMustHaveFormattedSpacing = /(([^\s](=|<|>|<=|>=|-(?!-)|\+(?!\+)))|((=|<|>|<=|>=|-|\+)[^\s]))(?<!--|\+\+|-\)|\+\))/g;
  const loopsMustHaveFormattedSemicolonSpacing = /(;)[^\s]/g;
  const failsLoopsMustHaveformattedSpacingTest = loopsMustHaveFormattedSpacing.test(line);
  const failsLoopsMustHaveFormattedSemicolonSpacing = loopsMustHaveFormattedSemicolonSpacing.test(line);
  let results: any[] = [];
  if (failsLoopsMustHaveformattedSpacingTest) {
    const result = {
      [FILE]: file,
      [PRIORITY]: 3,
      [LINE]: i,
      [DESCRIPTION]: LOOPS_MUST_HAVE_FORMATTED_SPACING_DESCRIPTION,
      [RULE_SET]: CODE_STYLE,
      [RULE]: LOOPS_MUST_HAVE_FORMATTED_SPACING_RULE,
    };
    results.push(result);
  }
  if (failsLoopsMustHaveFormattedSemicolonSpacing) {
    const result = {
      [FILE]: file,
      [PRIORITY]: 3,
      [LINE]: i,
      [DESCRIPTION]: LOOPS_MUST_HAVE_FORMATTED_SPACING_DESCRIPTION,
      [RULE_SET]: CODE_STYLE,
      [RULE]: LOOPS_MUST_HAVE_FORMATTED_SPACING_RULE,
    };
    results.push(result);
  }
  return results;
};