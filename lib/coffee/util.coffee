fs = require "fs"
cf = require "../config"
URL = cf.url

# 获取激活列表
getActiveList = () ->
    activefile = fs.readFileSync URL.ACTIVE_FILE, "utf8"
    activefile.split "|"

# 写激活列表
setActiveList = (fd) ->
    fs.writeFileSync URL.ACTIVE_FILE, fd

# 获取系统host
getSystemHost = () ->
    fs.readFileSync URL.SYSHOST_FILE, "utf8"

# 写系统host
setSystemHost = (fd) ->
    fs.writeFileSync URL.SYSHOST_FILE, fd

# 获取用户的host配置列表
getConfigList = () ->
    fs.readdirSync URL.HOSTCONF_DIR

# 获取用户的host配置文件
getConfigFile = (name) ->
    fs.readFileSync URL.HOSTCONF_DIR + name, "utf8"

# 判断host配置是否存在
configExisted = (name) ->
    fs.existsSync URL.HOSTCONF_DIR + name

# 转命令行参数为file name
input2name = (input) ->
    firstChar = input[0]
    if firstChar is "*"
        # 输入为文件代号
        configList = getConfigList()
        result = configList[input.slice(1)]
        result = input if not result?
    else
        # 输入为文件名
        result = input
    result

# 读取多个文件内容
readFiles = (files) ->
    result = []
    for f in files
        result.push(getConfigFile f)
    return result

# 逐行打印文件内容
printLines = (fd) ->
    lines = fd.split("\n")
    for l in lines
        console.log l

# 打印
print = (str) ->
    console.log str

# 控制台打印分割线
splitLine = ->
    console.log "------------------------------"

# 分割多参数供commander使用
list = (val) ->
    # return val.split /\s+/
    return val.split ","

# 数组去重
unique = (arr) ->
    uni = {}
    result = []
    for d in arr
        if not uni[d]
            uni[d] = true
            result.push d
    return result

# 消息
result = (success, msg, data) ->
    success: success
    msg: msg
    data: data


exports.getActiveList = getActiveList
exports.setActiveList = setActiveList
exports.getSystemHost = getSystemHost
exports.setSystemHost = setSystemHost
exports.getConfigList = getConfigList
exports.getConfigFile = getConfigFile
exports.input2name = input2name
exports.readFiles = readFiles
exports.configExisted = configExisted
exports.printLines = printLines
exports.print = print
exports.sl = splitLine
exports.list = list
exports.unique = unique
exports.result = result