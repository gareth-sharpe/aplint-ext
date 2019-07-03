import { CancellationToken, } from 'vscode';
import { exec } from 'child_process';

export const execCmd = async (path: string, token?: CancellationToken): Promise<string> => {
  const dir = __dirname;

  const targetFlag = `-d ${path}`;
  const rulesetFlag = `-R ${dir}/../../ruleset.xml`;
  const formatFlag = `-f csv`;

  const cmdArgs = `${targetFlag} ${rulesetFlag} ${formatFlag}`;

  const cmd = `${dir}/../../pmd-bin-6.16.0/bin/run.sh pmd ${cmdArgs}`;
  const process = exec(cmd);
  
  let data: string = '';
  data = await new Promise((resolve, reject) => {
    process.stdout!.on('data', (line) => {
      data += line;
    });
    process.addListener('exit', (e) => {
      if (e !== 0 && e !== 4) {
        reject('APLint failed.');
      }
      resolve(data);
    });
  });
  return data;
};
  

    
