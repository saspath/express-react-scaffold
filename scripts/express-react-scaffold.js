#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')
const path = require('path');
const fs = require('fs');
const readline = require("readline");

const argv = yargs(hideBin(process.argv)).argv
console.log('argv, ', argv);

if (argv._.length !== 1) {
  console.log("usage: js-scaffold <project directory>");
  process.exit();
}

const projectPath = path.resolve(process.cwd(), argv._[0]);
if (fs.existsSync(projectPath)) {
  console.log(`directory ${projectPath} already exists.`)
  process.exit();
}
