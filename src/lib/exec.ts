import { CancellationToken, } from 'vscode';
import { exec } from 'child_process';
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
  let configuredRulesets: string[] | undefined = workspace.getConfiguration().get('aplint.customRulesets');

  const manulifeConfiguration = `${dir}/../config/manulife/`;

  const files = await fs.readdirSync(manulifeConfiguration);
  let rulesets = `-R ${dir}/../../ruleset.xml`;
  files.forEach((file: any) => {
    rulesets = rulesets.concat(`,${dir}/../config/manulife/${file}`);
  });

  const targetFlag = `-d ${path}`;
  const rulesetFlag = configuredRulesets!.length ? 
    `-R ${configuredRulesets}` : 
    rulesets;
  const formatFlag = `-f csv`;

  const cmdArgs = `${targetFlag} ${rulesetFlag} ${formatFlag}`;
  const isWin = process.platform === 'win32';
  console.log('isWin', isWin);
  console.log('cmd', `${dir}/../../pmd-bin-6.16.0/bin/pmd.bat ${cmdArgs}`);
  const cmd = isWin ? 
    `${dir}\..\..\pmd-bin-6.16.0\bin\pmd.bat ${cmdArgs}`:
    `${dir}/../../pmd-bin-6.16.0/bin/run.sh pmd ${cmdArgs}`;
  const spawn = exec(cmd);
  
  let data: string = '';
  data = await new Promise((resolve, reject) => {
    spawn.stdout!.on('data', (line) => {
      data += line;
      console.log('line', line);
    });
    spawn.addListener('exit', (e) => {
      if (e !== 0 && e !== 4) {
        console.log('e', e);
        reject('APLint failed.');
      }
      resolve(data);
    });
  });
  return data;
};
  

    
