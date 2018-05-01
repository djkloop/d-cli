var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var chalk = require('chalk');
var download = require('download-git-repo');
// workdir
var proWorkPath = process.cwd();
var inquirer = require('inquirer');
var templatePath = path.resolve(ROOT_PATH, '../templates');
var templatePathLocal = path.resolve(templatePath, './normal/');
var ora = require('ora');
var spinnerInit = ora('now init our project...');
var gitTemplUrl = 'djkloop/djkloop-cli-template';
console.log(chalk.green(`当前运行工作目录为 -> ${proWorkPath}`));


/**
 * get code from github
 */

var loadNormalTemplate = function (cb) {
  download(gitTemplUrl, proWorkPath, function (err) {
    if (err) console.log(chalk.red('程序出错了...', err));
    cb && cb(err);
  });
}

/**
 * 
 */

var fs = require('fs');
var task = {
  'checkdir': function (cb) {
    fs.exists(path.resolve(proWorkPath, './src/'), function (exists) {
      cb && cb(exists);
    });
  },
  'createdir': function (cb) {
    var self = this;
    loadNormalTemplate(function () {
      console.log('download templat ok');
      self.creatDist();
      cb && cb();
    });
  },
  creatDist: function () {
    var self = this;
    fs.mkdir(path.resolve(proWorkPath, './dist/'), function () {
      spinnerInit.stop();
      console.log('dir creat success!');
      console.log('next install lib ...');
      self.installLib();
    });
  },
  installLib: function () {
    child_process.execSync('cd ' + proWorkPath + ' && ' + 'cnpm install', function () {
      console.log('install ok');
    });
  }
}


module.exports = {
  render: function () {
    console.log('kkk')
    inquirer.prompt([{
      type: 'list',
      message: 'which template do you need:',
      name: 'template',
      choices: [chalk.yellow('基础版本'), '后续版本敬请期待']
    }, {
      type: 'list',
      message: 'which tpl language do you need:',
      name: 'tpllanguage',
      choices: ['velocity', 'els']
    }]).then(function (answers) {
      if (answers.template == chalk.yellow('基础版本')) {
        tmplUrl = gitTemplUrl;
      } else {
        console.log('目前只发布了 基础版本 模板');
        return;
      }

      spinnerInit.start();
      task.checkdir(function (exists) {
        console.log(exists,  ' 进来了么？')
        if (exists) {
          console.log("this project had init!");
        } else {
          task.createdir(function () {
            if (answers.tpllanguage == 'velocity') {
              velocityChange();
            }
          });
          //task.creatDist();

        }
      })
    })
  }
} 