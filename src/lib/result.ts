import { FILE, DESCRIPTION, LINE, PRIORITY, RULE_SET, RULE } from '../utils/constants';

export const makeResult = (
  file: string, 
  priority: number, 
  line: number, 
  ruleset: string, 
  description: string, 
  rule: string) => {
  const result = {
    [FILE]: file,
    [PRIORITY]: priority,
    [LINE]: line,
    [DESCRIPTION]: description,
    [RULE_SET]: ruleset,
    [RULE]: rule,
  };
  return result;
};