/*global describe, it*/
'use strict';

var _ = require('underscore'),
    App = require('../lib/App');

describe('App', function () {
    it('has correct methods', function () {
        var app = new App({}),
            methods = [
                'initialize',
                'install',
                'uninstall',
                'activate',
                'deactivate'
            ];
        
        _(methods).each(function (method) {
            _.isFunction(app[method]).should.equal(true);
        });
    });
});