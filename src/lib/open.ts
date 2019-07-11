import { Diagnostic, window, ViewColumn } from "vscode";

const fetch = require('node-fetch');
const NOT_FOUND = -1;

interface Info {
  rule: string;
  category: string;
  url?: string;
}

/**
 * Opens a rule in a new VSCode window.
 * @author Gareth Sharpe
 * @param {Diagnostic} diagnostic A diagnostic of the violated rule
 * @returns {Promise<void}
 * @async
 */
export const openRule = async (diagnostic: Diagnostic): Promise<void> => {
  const panel = window.createWebviewPanel(
    'aplint',
    'Rule Description',
    ViewColumn.Two
  );
  const info = getInfo(diagnostic);
  const { url, rule } = info;
  const response = await fetch(url);
  const html = await response.text();
  const start = html.indexOf(`<h2 id="${rule.toLowerCase()}">${rule}</h2>`);
  const end = html.indexOf(`Use this rule with the default properties by just referencing it`);
  const content = html.substring(start, end);
  const viewInBrowserLink = `<br><a href=${url}> View in browser </a>`;
  const fullPanel = viewInBrowserLink.concat(content);
  panel.webview.html = fullPanel;
};

/**
 * Fetches information reguarding a violoated rule
 * @author Gareth Sharpe
 * @param diagnostic A diagnostic of the violated rule
 * @returns {Info}
 */
const getInfo = (diagnostic: Diagnostic): Info => {
  const { code } = diagnostic;
  const splitCodes = String(code)!.split(' ');
  const rule = splitCodes[0];
  const category = splitCodes[1];
  const categories: string[] = [
    "BestPractices",
    "CodeStyle",
    "Design",
    "Documentation",
    "ErrorProne",
    "Performance",
    "Security"
  ];
  let info: Info = {
    rule,
    category,
  };
  console.log(categories.indexOf(category));
  if (categories.indexOf(category) === NOT_FOUND) {
    info.url = getCustomDocumentation(rule, category);
  } else {
    info.url = `https://pmd.github.io/latest/pmd_rules_apex_${category.toLowerCase()}.html#${rule.toLowerCase()}`;
  }
  

  return info;
};

const getCustomDocumentation = (rule: string, category: string): string => {
  console.log(rule, category);
  const docsPath = `${__dirname}/../docs/${category}/${rule}.md`;
  console.log(docsPath);
  return '';
};