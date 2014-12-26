(function() {
  var host, program, start, util;

  program = require("commander");

  host = require("./index");

  util = require("./util");

  start = function(argv) {
    var allConfs, c, result, syshost, _i, _len;
    program.version("0.0.1").option("-l, --list", "list all host files").option("-c, --current", "print current host").option("-v, --view <name or *number>", "view host file by num or name").option("-s, --select <names or *numbers, seperate with ','>", "set host active", util.list).parse(argv);
    if (program.list) {
      util.sl();
      allConfs = host.listAll();
      for (_i = 0, _len = allConfs.length; _i < _len; _i++) {
        c = allConfs[_i];
        util.print(c);
      }
      util.sl();
    }
    if (program.current) {
      util.sl();
      syshost = host.current();
      util.printLines(syshost);
      util.sl();
    }
    if (program.view) {
      util.sl();
      result = host.view(program.view);
      if (result.success) {
        util.printLines(result.data);
      } else {
        util.print(result.msg);
      }
      util.sl();
    }
    if (program.add) {
      host.add();
    }
    if (program.remove) {
      host.remove();
    }
    if (program.select) {
      result = host.select(program.select);
      return util.print(result.msg);
    }
  };

  exports.start = start;

}).call(this);
