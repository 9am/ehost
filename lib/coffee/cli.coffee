program = require "commander"
host = require "./index"
util = require "./util"

start = (argv) ->
    program
        .version "0.0.1"
        .option "-l, --list", "list all host files"
        .option "-c, --current", "print current host"
        .option "-v, --view <name or *number>", "view host file by num or name"
        # .option "-a, --add <name>", "add host file"
        # .option "-r, --remove <name or *number>", "remove host file by num or name"
        .option "-s, --select <names or *numbers, seperate with ','>", "set host active", util.list
        .parse argv

    if program.list
        util.sl()
        allConfs = host.listAll()
        for c in allConfs
            util.print c
        util.sl()

    if program.current
        util.sl()
        syshost = host.current()
        util.printLines syshost
        util.sl()

    if program.view
        util.sl()
        result = host.view program.view
        if result.success
            util.printLines result.data
        else
            util.print result.msg
        util.sl()

    if program.add
        # TODO
        host.add()

    if program.remove
        # TODO
        host.remove()

    if program.select
        result = host.select program.select
        util.print result.msg

exports.start = start