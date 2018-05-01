#! /usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const version = require('./package.json').version




commander
    .version(version)
    .description(chalk.green(
        'd-cli for nodejs \n' +
        chalk.bold('    this cli just learn. \n') +
        '       d-cli now version is '+ version +''
    ))
    .usage(chalk.bold('[options]'))
    .option('-i, --init', 'init a new project for a template')
    .option('-d, --dev', 'start project for development')
    .option('-b, --build', 'start project for production')
    .option('-s, --server', 'local server')
    .option('-p, --publish', 'npm publish')

/**
 * init
 */

 if(commander.init) {
     require('./src/task/task-init.js').render();
 }

  /** 
  * --help log info
 */

commander.on('--help', function() {
    console.log('  Example:')
    console.log();
    console.log(chalk.gray('    # create a new project with an official template'));
    console.log('   $ d-cli --init or d-cli -i');
    console.log();
    console.log(chalk.gray('    # development project'));
    console.log('   $ d-cli --dev or d-cli -d');
    console.log()
    console.log(chalk.gray('    # start local server'))
    console.log('   $ d-cli --server or d-cli -s')
    console.log()
 });


 commander.parse(process.argv);