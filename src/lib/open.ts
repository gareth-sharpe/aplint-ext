import { Diagnostic, window, ViewColumn } from "vscode";
const marked = require('marked');

const fetch = require('node-fetch').default;
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
  const response = await fetch(url);
  const text = await response.text();
  let html: string;
  if (custom) {
    html = marked(text);
    const viewInBrowserLink = `<br><a href=${url}> View in browser </a>`;
    html = viewInBrowserLink.concat(html);
  } else {
    const start = text.indexOf(`<h2 id="${rule.toLowerCase()}">${rule}</h2>`);
    const end = text.indexOf(`Use this rule with the default properties by just referencing it`);
    const content = text.substring(start, end);
    const viewInBrowserLink = `<br><a href=${url}> View in browser </a>`;
    html = viewInBrowserLink.concat(content);
  }
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
  if (splitCodes.length === 3) {
    splitCodes[1] += splitCodes[2];
  }
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
  if (categories.indexOf(category) === NOT_FOUND) {
    info.custom = true;
    info.url = `https://raw.githubusercontent.com/gareth-sharpe/aplint-ext/master/src/docs/${category}/${rule}.md`;
  } else {
    info.custom = false;
    info.url = `https://pmd.github.io/latest/pmd_rules_apex_${category.toLowerCase()}.html#${rule.toLowerCase()}`;
  }
  return info;
};