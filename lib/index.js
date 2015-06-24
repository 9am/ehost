/**
 * @file ehost
 * @author gaobo(gbgogb@gmail.com)
 */

var util = require('./util');
var config = require('./config');

/**
 * 列出所有可用host配置
 *
 * @return {Object} Error 或 可用配置
 */
exports.listAll = function () {
    try {
        var hosts = util.readDirSyncExisted(config.HOSTS_URL);
        var actives = util.readFileSyncExisted(config.ACTIVES_URL).split('|');

        // 可用host数组
        return hosts.map(function (item, index) {
            // 查找文件名，判断是否激活
            var mark = (actives.indexOf(item) === -1) ? '○' : '●';
            return [mark, ' [', '*', index, ']', ': ', item].join('');
        });
    }
    catch (err) {
        // 如有错误，直接返回
        return err;
    }
};

/**
 * 获取当前系统host
 *
 * @return {Object} Error 或 系统host
 */
exports.current = function () {
    try {
        return util
            .readFileSyncExisted(config.SYS_HOST_URL)
            .split('\n');
    }
    catch (err) {
        // 如有错误，直接返回
        return err;
    }
};

/**
 * 查看某一host配置
 *
 * @param {string} hostName 配置文件名
 * @return {Object} Error 或 host配置
 */
exports.view = function (hostName) {
    try {
        // 编号转化为名称
        var hosts = util.readDirSyncExisted(config.HOSTS_URL);
        hostName = util.indexNum2Name(hosts, hostName);
        return util
            .readFileSyncExisted(hostName, config.HOSTS_URL)
            .split('\n');
    }
    catch (err) {
        // 如有错误，直接返回
        return err;
    }
};

/**
 * 选择一个或多个配置
 *
 * @param {Array} hostNames 配置文件名数组
 * @return {Object} Error 或 设置成功的配置名
 */
exports.select = function (hostNames) {
    try {
        // 编号转化为名称
        var hosts = util.readDirSyncExisted(config.HOSTS_URL);
        hostNames = hostNames.map(function (item) {
            return util.indexNum2Name(hosts, item);
        });
        // 填入default
        hostNames.unshift('default');
        // 去重
        hostNames = util.unique(hostNames);
        // 读配置文件，合并
        var files = util.readFilesSync(hostNames, config.HOSTS_URL);
        // 写系统host
        util.writeFileSync(config.SYS_HOST_URL, files);
        // 记录选择
        util.writeFileSync(config.ACTIVES_URL, hostNames.join('|'));
        return hostNames;
    }
    catch (err) {
        // 如有错误，直接返回
        return err;
    }
};
