util = require "./util"

# 列出所有可选的host配置
listAll = ->
    output = []
    activeList = util.getActiveList()
    configList = util.getConfigList()
    for f, i in configList
        isActived = activeList.indexOf(f) isnt -1
        activeMark = if isActived then "●" else "○"
        output.push "#{activeMark}[*#{i}]:#{f}"
    return output

# 获取当前系统host
current = ->
    return util.getSystemHost()

# 查看某一host配置
view = (inputStr) ->
    confName = util.input2name inputStr
    if util.configExisted confName
        result = util.result true, "success", util.getConfigFile confName
    else
        result = util.result false, "#{confName} DO NOT EXIST.", confName
    return result

# 添加host配置
add = ->
    return "add"

# 删除host配置
remove = ->
    return "remove"

# 选择一个或多个host配置
select = (selectList) ->
    # 添加default
    selectList.unshift "default"
    # 排除不存在的config
    notExistedList = []
    for l, i in selectList
        selectList[i] = util.input2name l
        notExistedList.push l if not util.configExisted(selectList[i])
    # 去重
    uniqueList = util.unique selectList
    if notExistedList.length is 0
        # 如果全都存在
        hostFilesData = util.readFiles(uniqueList).join "\n\n"
        # 写host文件
        util.setSystemHost hostFilesData
        # 写active文件
        util.setActiveList uniqueList.join("|")
        result = util.result true, "#{uniqueList} IS ACTIVED.", uniqueList
    else
        result = util.result false, "#{notExistedList} DO NOT EXIST.", notExistedList
    return result

exports.listAll = listAll
exports.current = current
exports.view = view
exports.remove = remove
exports.select = select