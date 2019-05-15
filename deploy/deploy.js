'use strict';

const path = require('path');
const execa = require('execa');
const chalk = require('chalk');
const error = chalk.bold.red;
const code = chalk.bold.blue;
const highlight = chalk.bold.cyan;
const warning = chalk.keyword('orange');
const format = require('format');
const printf = format.printf;
const NODE_ENV = process.env.NODE_ENV;
let DOCKER_TAG = process.env.npm_package_name;
const PROJECT_ROOT_PATH = path.join(__dirname, '..');

//1.clean docker image container
//2.build docer image
//3.run docker service

try {
  printf(highlight(">>>>>>>>>>>>>>>> Build jsgantt-improved"));
  execa.shell('docker rmi -f mydog && docker rm -f dogapp').then(result => {
    printf(result.stdout);
    printf(result.stderr);
  });

  printf(highlight(">>>>>>>>>>>>>>>> Clear legacy image and container"));
  let clean_docker_task = execa('npm', ['run', '--prefix', PROJECT_ROOT_PATH + '/src/app/common/jsgantt-improved/' , 'dist']);
  clean_docker_task.stderr.pipe(process.stderr);
  clean_docker_task.stdout.pipe(process.stdout);
  clean_docker_task.then(() => {
    printf(highlight(">>>>>>>>>>>>>>>> STEP 0 Yarn Install"));
    let task0 = execa('yarn', ['install', '--production=false']);
    task0.stderr.pipe(process.stderr);
    task0.stdout.pipe(process.stdout);
    return task0;
  }).then((task) => {
    printf(highlight(">>>>>>>>>>>>>>>> STEP 1 Ng Build Package"));
    let buildParam = process.env.NODE_ENV === "production" ? 'build:prod' : 'build';
    let task1 = execa('yarn', ['--cwd', PROJECT_ROOT_PATH, 'run', buildParam]);
    task1.stderr.pipe(process.stderr);
    task1.stdout.pipe(process.stdout);
    return task1;
  })

} catch (err) {
  printf(error(err));
};



docker rmi -f mydog && docker rm -f dogapp
yarn --cwd ./client build && docker build -t mydog . && docker run --name dogapp -p 8080:80 mydog

docker build -t dogserver .
docker run --name mydogserver -p 5000:5000 dogserver

docker rmi -f mydogserver && docker rm -f dogserver
docker build -t mydogserver .

















