/**
 * @file ehost 工具
 * @author gaobo(gbgogb@gmail.com)
 */

var fs = require('fs');
var path = require('path');

/**
 * 控制台分割线
 *
 * @const
 * @type {string}
 */
var SPLIT_LINE = '------------------------------';

/**
 * 获取存在的文件路径
 * 不存在抛异常
 *
 * @param {string} dir 文件路径
 * @return {string} dir 文件路径
 */
exports.getPathIfExist = function (dir) {
    // 路径不存在，抛异常
    if (!fs.existsSync(dir)) {
        throw new Error(dir + ' does not exist.');
    }
    return dir;
};

/**
 * 同步读取文件内容
 *
 * @param {string} dir 文件路径
 * @param {string} baseUrl 基础路径
 * @return {Object} 文件内容
 */
exports.readFileSyncExisted = function (dir, baseUrl) {
    // 处理baseUrl
    baseUrl = baseUrl || '';
    return fs.readFileSync(
        this.getPathIfExist(path.resolve(baseUrl, dir)),
        'utf8'
    );
};

/**
 * 同步读取目录下文件名
 *
 * @param {string} dir 文件路径
 * @return {Array} 文件名数组
 */
exports.readDirSyncExisted = function (dir) {
    return fs.readdirSync(
        this.getPathIfExist(dir)
    ).filter(function (item, i) {
        // 去除：mac隐藏文件、文件夹
        var itemPath = path.resolve(dir, item);
        return (!fs.statSync(itemPath).isDirectory()
            && item[0] !== '.');
    });
};

/**
 * 同步读取多个文件内容
 *
 * @param {string} dirArr 文件路径
 * @param {string} baseUrl 基础路径
 * @return {Object} 文件内容
 */
exports.readFilesSync = function (dirArr, baseUrl) {
    var that = this;
    // 处理baseUrl
    baseUrl = baseUrl || '';
    // 读取文件
    var files = dirArr.map(function (item) {
        return that.readFileSyncExisted(
            item, baseUrl
        );
    });
    return files.join('\n\n');
};

/**
 * 同步写文件
 *
 * @param {string} dir 文件路径
 * @param {string} content 内容
 */
exports.writeFileSync = function (dir, content) {
    fs.writeFileSync(dir, content);
};

/**
 * 数组去重
 *
 * @param {Array} arr 原始数组
 * @return {Array} 去重后数组
 */
exports.unique = function (arr) {
    if (!this.isType(arr, 'Array')) {
        return arr;
    }
    var uni = {};
    return arr.filter(function (item) {
        if (!uni[item]) {
            uni[item] = true;
            return true;
        }
    });
};

/**
 * 对应数字和配置文件名称
 *
 * @param {Array} hosts 配置文件数组
 * @param {string} numStr 配置文件编号
 * @return {string} 配置文件名
 */
exports.indexNum2Name = function (hosts, numStr) {
    return numStr.match(/^\*/)
        ? hosts[numStr.slice(1)] || numStr
        : numStr;
};

/**
 * 是否是某种类型
 *
 * @param {Object} obj 对象
 * @param {string} type 类型
 * @return {boolean}
 */
exports.isType = function (obj, type) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
};

/**
 * 参数分割函数
 *
 * @param {Object} str 字符串
 * @return {Array}
 */
exports.list = function (str) {
    return str.split(',');
};

/**
 * 打印数组并换行
 *
 * @param {Array} arr 数组
 */
exports.printLines = function (arr) {
    console.log(SPLIT_LINE);
    arr.forEach(function (item) {
        console.log(item);
    });
    console.log(SPLIT_LINE);
};
