import { Diagnostic, window, ViewColumn } from "vscode";

const fetch = require('node-fetch');

interface Info {
  rule: string;
  category: string;
  url: string;
}

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

const getInfo = (diagnostic: Diagnostic): Info => {
  const { code } = diagnostic;
  const splitCodes = String(code)!.split(' ');
  const rule = splitCodes[0];
  const category = splitCodes[1];
  const url = `https://pmd.github.io/latest/pmd_rules_apex_${category.toLowerCase()}.html#${rule.toLowerCase()}`;
  const info: Info = {
    rule, 
    category, 
    url
  };
  return info;
};
  

    
