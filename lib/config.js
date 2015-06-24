/**
 * @file ehost config
 * @author gaobo(gbgogb@gmail.com)
 */

var path = require('path');

/**
 * 系统host文件路径
 *
 * @const
 * @type {string}
 */
exports.SYS_HOST_URL = path.resolve('/etc/hosts');
// exports.SYS_HOST_URL = path.resolve(__dirname, '../conf/fake-sys-host');

/**
 * 配置文件夹路径
 *
 * @const
 * @type {string}
 */
exports.HOSTS_URL = path.resolve(__dirname, '../conf/hosts');

/**
 * 激活文件路径
 *
 * @const
 * @type {string}
 */
exports.ACTIVES_URL = path.resolve(__dirname, '../conf/active');
