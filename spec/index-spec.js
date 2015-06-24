/**
 * @file index test
 * @author gaobo(gbgogb@gmail.com)
 */

var fs = require('fs');
var mock = require('mock-fs');
var config = require('../lib/config');
var ehost = require('../lib/index');

// mock文件系统
var mockfile = {
    conf: {
        'hosts': {
            'default': '#default',
            'host1': '#host1',
            'host2': '#host2',
            '.macHiden': '',
            'dir': {}
        },
        'active': 'default|host2',
        'fake-sys-host': '#default\n\n#host2'
    }
};

describe('listAll', function () {
    beforeEach(function () {
        // 构造假config
        config.SYS_HOST_URL = 'conf/fake-sys-host';
        config.HOSTS_URL = 'conf/hosts';
        config.ACTIVES_URL = 'conf/active';
        // 构造假文件系统
        mock(mockfile);
    });

    it('should verify hosts dir exsit first', function () {
        config.HOSTS_URL = 'hostsNotExsited';
        expect(
            ehost.listAll().toString()
        ).toContain('Error');
    });

    it('should verify active dir exsit first', function () {
        config.ACTIVES_URL = 'activeNotExsited';
        expect(
            ehost.listAll().toString()
        ).toContain('Error');
    });

    it('should return list', function () {
        var all = ehost.listAll();
        expect(all.length).toBe(3);
        expect(all).toEqual([
            '● [*0]: default',
            '○ [*1]: host1',
            '● [*2]: host2'
        ]);
    });
});

describe('current', function () {
    beforeEach(function () {
        // 构造假config
        config.SYS_HOST_URL = 'conf/fake-sys-host';
        // 构造假文件系统
        mock(mockfile);
    });

    it('should verify dir exsit first', function () {
        config.SYS_HOST_URL = 'sysHostNotExsited';
        expect(
            ehost.current().toString()
        ).toContain('Error');
    });

    it('should return current system host file', function () {
        var current = ehost.current();
        expect(current.length).toBe(3);
        expect(current).toEqual(['#default', '', '#host2']);
    });
});

describe('view', function () {
    beforeEach(function () {
        // 构造假config
        config.SYS_HOST_URL = 'conf/fake-sys-host';
        config.HOSTS_URL = 'conf/hosts';
        config.ACTIVES_URL = 'conf/active';
        // 构造假文件系统
        mock(mockfile);
    });

    it('should verify dir exsit first', function () {
        expect(
            ehost.view('hostNotExsited').toString()
        ).toContain('Error');
    });

    it('should recognize *num input', function () {
        var view = ehost.view('*2');
        expect(view.length).toBe(1);
        expect(view).toEqual(['#host2']);
    });

    it('should return host config file', function () {
        var view = ehost.view('host1');
        expect(view.length).toBe(1);
        expect(view).toEqual(['#host1']);
    });
});

describe('select', function () {
    beforeEach(function () {
        // 构造假config
        config.SYS_HOST_URL = 'conf/fake-sys-host';
        config.HOSTS_URL = 'conf/hosts';
        config.ACTIVES_URL = 'conf/active';
        // 构造假文件系统
        mock(mockfile);
    });

    it('should verify dir exsit first', function () {
        config.HOSTS_URL = 'hostsNotExsited';
        expect(
            ehost.select(['host1']).toString()
        ).toContain('Error');
    });

    it('should always include default', function () {
        expect(ehost.select(['host1'])).toContain('default');
    });

    it('should make selected ones unique', function () {
        var names = ehost.select(['host1', 'default', 'host1', 'host2']);
        expect(names.length).toBe(3);
        var syshost = fs.readFileSync(config.SYS_HOST_URL).toString();
        expect(syshost.match(/host1/g).length).toBe(1);
    });

    it('should record select ones in active file', function () {
        ehost.select(['host2']);
        var active = fs.readFileSync(config.ACTIVES_URL).toString();
        expect(active).toBe('default|host2');
    });

    it('should write selected in system host file', function () {
        ehost.select(['host1', 'host2']);
        var syshost = fs.readFileSync(config.SYS_HOST_URL).toString();
        expect(syshost).toBe('#default\n\n#host1\n\n#host2');
    });

    it('should recognize *num1,*num2 input', function () {
        ehost.select(['*2', '*1']);
        var active = fs.readFileSync(config.ACTIVES_URL).toString();
        expect(active).toBe('default|host2|host1');
        var syshost = fs.readFileSync(config.SYS_HOST_URL).toString();
        expect(syshost).toBe('#default\n\n#host2\n\n#host1');
    });
});
