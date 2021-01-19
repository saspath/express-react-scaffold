
const buildParam = require('../config/build.json');
const { execSync } = require("child_process");
const bundleAssets = buildParam.cdnRoot ? false :true;
const dockerRepo = buildParam.dockerRepo || "js-scaffold/default";
const version = require('../package.json').version;
const dockerTag = `${dockerRepo}:${version}`;

execSync(`docker build -t ${dockerTag} --build-arg BUNDLE_ASSETS=${bundleAssets} .`, {stdio: 'inherit'});
