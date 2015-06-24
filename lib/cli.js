/**
 * @file ehost client
 * @author gaobo(gbgogb@gmail.com)
 */

var program = require('commander');
var ehost = require('./index');
var util = require('./util');

program
    .version('0.0.0')
    .option('-l, --list', 'list all host files')
    .option('-c, --current', 'print current host')
    .option('-v, --view <name or *number>', 'print host file')
    .option('-s, --select <name or *number>', 'set host active', util.list);

/**
 * 执行命令
 *
 * @param {string} argvKey 参数key
 * @param {Function} ehostFunc 对应的ehost方法
 * @param {Function} printFunc 输出到控制台使用的方法
 * @param {string} extraMsg 附加信息
 */
var excute = function (argvKey, ehostFunc, printFunc, extraMsg) {
    var argv = program[argvKey];
    if (argv) {
        var result = ehostFunc(argv);
        if (util.isType(result, 'Error')) {
            console.error(result);
        }
        else {
            printFunc(result, extraMsg);
        }
    }
};

/**
 * 程序入口
 *
 * @param {Object} process node进程
 */
exports.start = function (process) {
    program.parse(process.argv);

    // 列出所有配置和使用情况
    excute('list', ehost.listAll, util.printLines);

    // 查看当前系统host
    excute('current', ehost.current, util.printLines);

    // 查看某一配置
    excute('view', ehost.view, util.printLines);

    // 选择一个或多个配置
    excute('select', ehost.select, console.log, ' is selected.');
};
