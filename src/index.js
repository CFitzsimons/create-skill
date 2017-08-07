#!/usr/bin/env node

import Commander from 'commander';
import environments from './environments';

Commander
  .version('1.0.0')
  .usage('<project name>')
  .arguments('<projectName>')
  .action((name) => {
    environments.alexa(name);
  })
  .parse(process.argv);

if (Commander.args.length !== 2) {
  Commander.help();
}
