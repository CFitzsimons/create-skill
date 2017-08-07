import fs from 'fs';
import path from 'path';

import linterRules from '../../configs/alexa/eslint.json';
import jsonPackage from '../../configs/alexa/package.json';

export default (projectName) => {
  console.info('Begining to setup Alexa project.');
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

  /* Create handlers folder */
  if (!fs.existsSync(`${projectRoot}/src/handlers`)) {
    fs.mkdirSync(`${projectRoot}/src/handlers`);
    console.info('Handler folder created');
  } else {
    console.warn('Looks like the handlers folder exists, continuing.');
  }

  /* Create test folder */
  if (!fs.existsSync(`${projectRoot}/test`)) {
    fs.mkdirSync(`${projectRoot}/test`);
    console.info('Test folder created');
  } else {
    console.warn('Looks like the test folder exists, continuing.');
  }

  /* Write config files */
  fs.writeFile(`${projectRoot}/package.json`, JSON.stringify(jsonPackage, null, 2), 'utf8', () => console.info('package.json written'));
  fs.writeFile(`${projectRoot}/.eslintrc`, JSON.stringify(linterRules, null, 2), 'utf8', () => console.info('eslint rules written'));

  /* Write sample source files */
  fs.createReadStream(path.join(__dirname, '../../configs/alexa/ignore')).pipe(fs.createWriteStream(`${projectRoot}/.gitignore`));
  fs.createReadStream(path.join(__dirname, '../../configs/alexa/root.js')).pipe(fs.createWriteStream(`${projectRoot}/index.js`));
  fs.createReadStream(path.join(__dirname, '../../configs/alexa/index.js')).pipe(fs.createWriteStream(`${projectRoot}/src/index.js`));
  fs.createReadStream(path.join(__dirname, '../../configs/alexa/handlers.js')).pipe(fs.createWriteStream(`${projectRoot}/src/handlers/handlers.js`));
  fs.createReadStream(path.join(__dirname, '../../configs/alexa/test.js')).pipe(fs.createWriteStream(`${projectRoot}/test/index.test.js`));

  console.info(`Alexa project setup finished.  run 'cd ${projectName} && npm install' to finish.`);
};
