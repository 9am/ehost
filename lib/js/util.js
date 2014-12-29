(function() {
  var URL, cf, configExisted, fs, getActiveList, getConfigFile, getConfigList, getSystemHost, input2name, list, print, printLines, readFiles, result, setActiveList, setSystemHost, splitLine, unique;

  fs = require("fs");

  cf = require("../config");

  URL = cf.url;

  getActiveList = function() {
    var activefile;
    activefile = fs.readFileSync(URL.ACTIVE_FILE, "utf8");
    return activefile.split("|");
  };

  setActiveList = function(fd) {
    return fs.writeFileSync(URL.ACTIVE_FILE, fd);
  };

  getSystemHost = function() {
    return fs.readFileSync(URL.SYSHOST_FILE, "utf8");
  };

  setSystemHost = function(fd) {
    return fs.writeFileSync(URL.SYSHOST_FILE, fd);
  };

  getConfigList = function() {
    var files;
    files = fs.readdirSync(URL.HOSTCONF_DIR);
    return files.filter(function(item, i) {
      return item[0] !== ".";
    });
  };

  getConfigFile = function(name) {
    return fs.readFileSync(URL.HOSTCONF_DIR + name, "utf8");
  };

  configExisted = function(name) {
    return fs.existsSync(URL.HOSTCONF_DIR + name);
  };

  input2name = function(input) {
    var configList, firstChar, result;
    firstChar = input[0];
    if (firstChar === "*") {
      configList = getConfigList();
      result = configList[input.slice(1)];
      if (result == null) {
        result = input;
      }
    } else {
      result = input;
    }
    return result;
  };

  readFiles = function(files) {
    var f, result, _i, _len;
    result = [];
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      f = files[_i];
      result.push(getConfigFile(f));
    }
    return result;
  };

  printLines = function(fd) {
    var l, lines, _i, _len, _results;
    lines = fd.split("\n");
    _results = [];
    for (_i = 0, _len = lines.length; _i < _len; _i++) {
      l = lines[_i];
      _results.push(console.log(l));
    }
    return _results;
  };

  print = function(str) {
    return console.log(str);
  };

  splitLine = function() {
    return console.log("------------------------------");
  };

  list = function(val) {
    return val.split(",");
  };

  unique = function(arr) {
    var d, result, uni, _i, _len;
    uni = {};
    result = [];
    for (_i = 0, _len = arr.length; _i < _len; _i++) {
      d = arr[_i];
      if (!uni[d]) {
        uni[d] = true;
        result.push(d);
      }
    }
    return result;
  };

  result = function(success, msg, data) {
    return {
      success: success,
      msg: msg,
      data: data
    };
  };

  exports.getActiveList = getActiveList;

  exports.setActiveList = setActiveList;

  exports.getSystemHost = getSystemHost;

  exports.setSystemHost = setSystemHost;

  exports.getConfigList = getConfigList;

  exports.getConfigFile = getConfigFile;

  exports.input2name = input2name;

  exports.readFiles = readFiles;

  exports.configExisted = configExisted;

  exports.printLines = printLines;

  exports.print = print;

  exports.sl = splitLine;

  exports.list = list;

  exports.unique = unique;

  exports.result = result;

}).call(this);
