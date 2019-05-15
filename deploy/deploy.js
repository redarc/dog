'use strict';

const path = require('path');
const execa = require('execa');
const NODE_ENV = process.env.NODE_ENV;
let DOCKER_TAG = process.env.npm_package_name;
const PROJECT_ROOT_PATH = path.join(__dirname, '..');
try {
  execa.shell(updateNginxConfPortCmd).then(result => {
    printf(result.stdout);
    printf(result.stderr);
  });

  printf(highlight(">>>>>>>>>>>>>>>> Build jsgantt-improved"));
  let task_build_jsgantt = execa('npm', ['run', '--prefix', PROJECT_ROOT_PATH + '/src/app/common/jsgantt-improved/' , 'dist']);
  task_build_jsgantt.stderr.pipe(process.stderr);
  task_build_jsgantt.stdout.pipe(process.stdout);
  task_build_jsgantt.then(() => {
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



docker rmi -f mydog && docker rm -f dogapp && cd client && yarn build && cd .. && docker build -t mydog . && docker run --name dogapp -p 8080:80 mydog

cd client && yarn build && cd .. && docker build -t mydog . && docker run --name dogapp -p 8080:80 mydog
