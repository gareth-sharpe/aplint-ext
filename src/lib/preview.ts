import { CancellationToken, } from 'vscode';
import { execSync } from 'child_process';
import * as open from 'open';
import { readdirSync, readFileSync, writeFileSync } from 'fs';

/**
 * Executes the ApexDoc java command with given paramaters.
 * @author Gareth Sharpe
 * @param {string} path The path to the directory to lint
 * @param {CancellationToken} token The token to use to identify exec cancellation
 * @return {Promise<string>}
 * @async
 */
export const previewDoc = async (path: string, token?: CancellationToken): Promise<void> => {
  const isWin = process.platform === 'win32';
  const sourceFlag = `-s ${path}`;
  const targetFlag = isWin ? 
    `-t ${__dirname}\\..\\ApexDoc` : 
    `-t ${__dirname}/../ApexDoc`;
  const cmdArgs = `${sourceFlag} ${targetFlag}`;
  const cmd = isWin ?
    `java -jar ${__dirname}\\..\\ApexDoc\\apexdoc.jar ${cmdArgs}`:
    `java -jar ${__dirname}/../ApexDoc/apexdoc.jar ${cmdArgs}`;
  console.info(cmd);
  try {
    await execSync(cmd);
  } catch (e) {
    console.error('e', e);
  }
  const docPath = isWin ? 
    `${__dirname}\\..\\ApexDoc\\ApexDocumentation\\index.html` : 
    `${__dirname}/../ApexDoc/ApexDocumentation/index.html`;
  await format();
  open(docPath);
  return;
};

const format = async (): Promise<void> => {
  const isWin = process.platform === 'win32';
  const folderPath = isWin ? 
    `${__dirname}\\..\\ApexDoc\\ApexDocumentation` : 
    `${__dirname}/../ApexDoc/ApexDocumentation`;
  const files = await readdirSync(folderPath);
  const filtered = files.filter((file) => file.includes('.html')); 
  filtered.forEach(async (fileName) => {
    const filePath = isWin ? 
      `${folderPath}\\${fileName}` :
      `${folderPath}/${fileName}`;
    const file = await readFileSync(filePath, 'utf8');
    const oldImage = "<img src='apex_doc_logo.png' style='border:1px solid #000;'/>";
    const newImage = "<img src='../logo.png' style='width:80; height:80'/>";
    let newFile = file.replace(oldImage, newImage);
    const oldBanner = "Project Demo</h2>Check out the gitHub project at:<br/><a href='http://github.com/SalesforceFoundation/ApexDoc'>http://github.com/SalesforceFoundation/ApexDoc</a><br/></td></tr></table></div><table width='100%'>";
    const newBanner = "APLint</h2>Check out the <a href='https://github.com/gareth-sharpe/aplint-ext'>GitHub repository</a><br/></td></tr></table></div><table width='100%'>";
    newFile = newFile.replace(oldBanner, newBanner);
    await writeFileSync(filePath, newFile);
  });
};
  

    
