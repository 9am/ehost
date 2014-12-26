(function() {
  var add, current, listAll, remove, select, util, view;

  util = require("./util");

  listAll = function() {
    var activeList, activeMark, configList, f, i, isActived, output, _i, _len;
    output = [];
    activeList = util.getActiveList();
    configList = util.getConfigList();
    for (i = _i = 0, _len = configList.length; _i < _len; i = ++_i) {
      f = configList[i];
      isActived = activeList.indexOf(f) !== -1;
      activeMark = isActived ? "●" : "○";
      output.push("" + activeMark + "[*" + i + "]:" + f);
    }
    return output;
  };

  current = function() {
    return util.getSystemHost();
  };

  view = function(inputStr) {
    var confName, result;
    confName = util.input2name(inputStr);
    if (util.configExisted(confName)) {
      result = util.result(true, "success", util.getConfigFile(confName));
    } else {
      result = util.result(false, "" + confName + " DO NOT EXIST.", confName);
    }
    return result;
  };

  add = function() {
    return "add";
  };

  remove = function() {
    return "remove";
  };

  select = function(selectList) {
    var hostFilesData, i, l, notExistedList, result, uniqueList, _i, _len;
    selectList.unshift("default");
    notExistedList = [];
    for (i = _i = 0, _len = selectList.length; _i < _len; i = ++_i) {
      l = selectList[i];
      selectList[i] = util.input2name(l);
      if (!util.configExisted(selectList[i])) {
        notExistedList.push(l);
      }
    }
    uniqueList = util.unique(selectList);
    if (notExistedList.length === 0) {
      hostFilesData = util.readFiles(uniqueList).join("\n\n");
      util.setSystemHost(hostFilesData);
      util.setActiveList(uniqueList.join("|"));
      result = util.result(true, "" + uniqueList + " IS ACTIVED.", uniqueList);
    } else {
      result = util.result(false, "" + notExistedList + " DO NOT EXIST.", notExistedList);
    }
    return result;
  };

  exports.listAll = listAll;

  exports.current = current;

  exports.view = view;

  exports.remove = remove;

  exports.select = select;

}).call(this);
