import fs from 'fs';
import path from 'path';

import linterRules from '../../configs/node/eslint.json';
import jsonPackage from '../../configs/node/package.json';

export default (projectName) => {
  console.info('Begining to setup NodeJS project.');
  const projectRoot = `./${projectName}`;
  jsonPackage.name = projectName;

  /* Create project folder */
  if (!fs.existsSync(projectRoot)) {
    fs.mkdirSync(projectRoot);
    console.info('Project folder created');
  } else {
    console.warn('Looks like the project folder exists, continuing');
  }

  /* Create source folder */
  if (!fs.existsSync(`${projectRoot}/src`)) {
    fs.mkdirSync(`${projectRoot}/src`);
    console.info('Source folder created');
  } else {
    console.warn('Looks like the source folder exists, continuing.');
  }

  /* Create test folder */
  if (!fs.existsSync(`${projectRoot}/test`)) {
    fs.mkdirSync(`${projectRoot}/test`);
    console.info('Test folder created');
  } else {
    console.warn('Looks like the test folder exists, continuing.');
  }

  /* Write config files */
  fs.writeFile(`${projectRoot}/package.json`, JSON.stringify(jsonPackage), null, 2, 'utf8', () => console.info('package.json written'));
  fs.writeFile(`${projectRoot}/.eslintrc`, JSON.stringify(linterRules, null, 2), 'utf8', () => console.info('eslint rules written'));
  fs.writeFile(`${projectRoot}/src/index.js`, 'console.log(\'Hello world!\');', 'utf8', () => console.info('package.json written'));
  fs.createReadStream(path.join(__dirname, '../../configs/node/ignore')).pipe(fs.createWriteStream(`${projectRoot}/.gitignore`));
};
