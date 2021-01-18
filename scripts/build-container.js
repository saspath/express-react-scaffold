
const buildParam = require('../config/build.json');
const { execSync } = require("child_process");
const bundleAssets = buildParam.cdnRoot ? false :true;
let dockerTag = buildParam.dockerTag || "js-scaffold/default";
const version = require('../package.json').version;

execSync(`docker build -t ${dockerTag}:${version} --build-arg BUNDLE_ASSETS=${bundleAssets} .`, {stdio: 'inherit'});

//push or deploy your container here
