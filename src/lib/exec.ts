import { CancellationToken, } from 'vscode';
import { exec, ChildProcess } from 'child_process';
import { workspace } from 'vscode';

const fs = require('fs');

/**
 * Executes the PMD linting shell/bash command with given paramaters.
 * @author Gareth Sharpe
 * @param {string} path The path to the directory to lint
 * @param {CancellationToken} token The token to use to identify exec cancellation
 * @return {Promise<string>}
 * @async
 */
export const execCmd = async (path: string, token?: CancellationToken): Promise<string> => {
  const dir = __dirname;
  console.log('dir', dir);
  let configuredRulesets: string[] | undefined = workspace.getConfiguration().get('aplint.customRulesets');

  const isWin = process.platform === 'win32';
  console.log('isWin', isWin);
  const manulifeConfiguration = isWin ? 
    `${dir}\\..\\config\\manulife` :
    `${dir}/../config/manulife`;
  console.log('configuration', manulifeConfiguration);
  const files = await fs.readdirSync(manulifeConfiguration);
  let rulesets = isWin ? 
    `-R ${dir}\\..\\ruleset.xml` :
    `-R ${dir}/../ruleset.xml`;
  console.log('rulesets', rulesets);
  files.forEach((file: any) => {
    const path = isWin ? 
      `,${manulifeConfiguration}\\${file}` :
      `,${manulifeConfiguration}/${file}`;
    console.log('path', path);
    rulesets = rulesets.concat(path);
  });

  const targetFlag = `-d ${path}`;
  const rulesetFlag = configuredRulesets!.length ? 
    `-R ${configuredRulesets}` : 
    rulesets;
  const formatFlag = `-f csv`;

  const cmdArgs = `${targetFlag} ${rulesetFlag} ${formatFlag}`;
  console.log('args', cmdArgs);
  const cmd = isWin ? 
    `${dir}\\..\\pmd-bin-6.16.0\\bin\\pmd.bat ${cmdArgs}`:
    `${dir}/../pmd-bin-6.16.0/bin/run.sh pmd ${cmdArgs}`;
  console.log('cmd', cmd);
  let spawn: ChildProcess;
  try {
    spawn = exec(cmd);
    console.log('spawn', spawn);
  } catch (e) {
    console.log('e', e);
  }
  
  let data: string = '';
  data = await new Promise((resolve, reject) => {
    spawn.stdout!.on('data', (line) => {
      data += line;
    });
    spawn.addListener('error', (e) => {
      console.log('error', e);
      reject('APLint failed on error.');
    });
    spawn.addListener('exit', (e) => {
      if (e !== 0 && e !== 4) {
        console.log('e', e);
        reject('APLint failed on exit.');
      }
      resolve(data);
    });
  });
  return data;
};
  

    
