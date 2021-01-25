#!/usr/bin/env node

const yargs = require('yargs/yargs');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { hideBin } = require('yargs/helpers')
const manifest = require('../config/manifest.json');
const packageJson = require('../package.json');

const argv = yargs(hideBin(process.argv)).argv;
const cwd = process.cwd();

try {
  const projectPath = validateProjectTarget();
  copyProjectFiles(projectPath);
  process.chdir(projectPath);
  updatePackageJson(projectPath);
  execSync('git init');
  execSync('npm install', { stdio: 'inherit' });
} finally {
  process.chdir(cwd);
}


//////////////////////////////////
function validateProjectTarget() {

  if (argv._.length !== 1) {
    console.log("usage: express-react-app <project directory>");
    process.exit();
  }

  const projectPath = path.resolve(process.cwd(), argv._[0]);
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath);
  }

  const conflicts = manifest.filter(m => fs.existsSync(path.resolve(projectPath, m)));
  if (conflicts.length > 0) {
    console.log("The project could not be scaffolded due to the following conflicts:");
    conflicts.map(c => console.log(`   ${path.resolve(projectPath, c)}`));
    console.log('remove the conflicting files or use a different target directory');
    process.exit();
  }

  return projectPath;
}


///////////////////////////////////////
function copyProjectFiles(projectPath) {
  manifest.map(m => {
    let current = projectPath;
    const dirs = m.split('/').filter(d => d !== '.');
    dirs.pop();
    dirs.forEach(d => {
      current = `${current}/${d}`;
      if (!fs.existsSync(current)) {
        fs.mkdirSync(current);
      }
    })
    fs.copyFileSync(path.resolve(__dirname, '..', m), path.resolve(projectPath, m))
  });
}


//////////////////////////////
function updatePackageJson(projectPath) {
  packageJson.name = projectPath.split(path.sep).pop();
  packageJson.version = "0.1.0";
  packageJson.private = true;
  delete(packageJson.publishConfig);
  delete(packageJson.repository);
  delete(packageJson.bin);
  delete(packageJson.license);
  delete(packageJson.author);
  fs.writeFileSync(`${projectPath}/package.json`, Buffer.from(JSON.stringify(packageJson, null, 2), 'utf-8'));
}
