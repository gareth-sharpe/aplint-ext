import { CancellationToken, } from 'vscode';
import { exec } from 'child_process';
import { workspace } from 'vscode';

export const execCmd = async (path: string, token?: CancellationToken): Promise<string> => {
  const dir = __dirname;
  let configuredRulesets: string[] | undefined = workspace.getConfiguration().get('aplint.customRulesets');

  const targetFlag = `-d ${path}`;
  const rulesetFlag = configuredRulesets!.length ? 
    `-R ${configuredRulesets}` : 
    `-R ${dir}/../../ruleset.xml`;
  const formatFlag = `-f csv`;

  const cmdArgs = `${targetFlag} ${rulesetFlag} ${formatFlag}`;
  const isWin = process.platform === 'win32';
  const cmd = isWin ? 
    `${dir}/../../pmd-bin-6.16.0/bin/pmd.bat ${cmdArgs}` :
    `${dir}/../../pmd-bin-6.16.0/bin/run.sh pmd ${cmdArgs}`;
  const spawn = exec(cmd);
  
  let data: string = '';
  data = await new Promise((resolve, reject) => {
    spawn.stdout!.on('data', (line) => {
      data += line;
    });
    spawn.addListener('exit', (e) => {
      if (e !== 0 && e !== 4) {
        reject('APLint failed.');
      }
      resolve(data);
    });
  });
  return data;
};
  

    
