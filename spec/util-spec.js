/**
 * @file util test
 * @author gaobo(gbgogb@gmail.com)
 */

var mock = require('mock-fs');
var util = require('../lib/util');

describe('getPathIfExist function', function () {
    beforeEach(function () {
        mock({
            conf: {
                active: 'default|host1'
            }
        });
    });

    it('should throw error if file does not exsit', function () {
        expect(function () {
            util.getPathIfExist('notexsited');
        }).toThrow();
    });

    it('should return file dir if file exsit', function () {
        expect(
            util.getPathIfExist('conf/active')
        ).toBe('conf/active');
    });
});

describe('readFileSyncExisted function', function () {
    beforeEach(function () {
        mock({
            conf: {
                active: 'default|host1'
            }
        });
    });

    it('should verify file exsit first', function () {
        expect(function () {
            util.readFileSyncExisted('notexsited');
        }).toThrow();
    });

    it('should read file successfull', function () {
        expect(
            util.readFileSyncExisted('conf/active')
        ).toBe('default|host1');
    });

    it('should read file with baseUrl', function () {
        expect(
            util.readFileSyncExisted('active', 'conf')
        ).toBe('default|host1');
    });
});

describe('readDirSyncExisted function', function () {
    beforeEach(function () {
        mock({
            conf: {
                hosts: {
                    'default': '#default',
                    'host1': '#host1',
                    'host2': '#host2',
                    '.macHiden': '',
                    'dir': {}
                }
            }
        });
    });

    it('should verify file exsit first', function () {
        expect(function () {
            util.readDirSyncExisted('notexsited');
        }).toThrow();
    });

    it('should get files successfull', function () {
        var hosts = util.readDirSyncExisted('conf/hosts');
        expect(hosts.length).toBe(3);
        expect(hosts).toContain('host2');
    });
});

describe('readFilesSync function', function () {
    beforeEach(function () {
        mock({
            conf: {
                hosts: {
                    'default': '#default',
                    'host1': '#host1',
                    'host2': '#host2'
                }
            }
        });
    });

    it('should verify file exsit first', function () {
        expect(function () {
            util.readFilesSync(['notexsited', 'host1', 'host2']);
        }).toThrow();
    });

    it('should read files successfull', function () {
        var files = util.readFilesSync([
            'conf/hosts/default',
            'conf/hosts/host1'
        ]);
        expect(files).toBe('#default\n\n#host1');
    });

    it('should read files with baseUrl', function () {
        var files = util.readFilesSync([
            'default',
            'host2'
        ], 'conf/hosts');
        expect(files).toBe('#default\n\n#host2');
    });
});

describe('unique function', function () {
    it('should verify array first', function () {
        var string = 'not an array';
        expect(util.unique(string)).toBe(string);
    });

    it('should unique array items', function () {
        var arr = [
            '',
            null,
            undefined,
            'test/1',
            'test/2',
            'test/2',
            'test/3',
            'test/3',
            'test/3'
        ];
        var result = util.unique(arr);
        expect(result.length).toBe(6);
    });
});
