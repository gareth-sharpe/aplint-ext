import { Diagnostic, window, ViewColumn } from "vscode";
const marked = require('marked');

const fetch = require('node-fetch');
const NOT_FOUND = -1;

interface Info {
  rule: string;
  category: string;
  url?: string;
  custom?: boolean;
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
  const { url, rule, custom } = info;
  console.log(url);
  const response = await fetch(url);
  const text = await response.text();
  let html: string;
  if (custom) {
    html = marked(text);
  } else {
    html = 'Not Defined';
  }
  console.log(html);
  // const start = html.indexOf(`<h2 id="${rule.toLowerCase()}">${rule}</h2>`);
  // const end = html.indexOf(`Use this rule with the default properties by just referencing it`);
  // const content = html.substring(start, end);
  // const viewInBrowserLink = `<br><a href=${url}> View in browser </a>`;
  // const fullPanel = viewInBrowserLink.concat(content);
  panel.webview.html = html;
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
    info.custom = true;
    info.url = `https://raw.githubusercontent.com/gareth-sharpe/aplint-ext/master/src/docs/${category}/${rule}.html`;
  } else {
    info.custom = false;
    info.url = `https://pmd.github.io/latest/pmd_rules_apex_${category.toLowerCase()}.html#${rule.toLowerCase()}`;
  }
  return info;
};