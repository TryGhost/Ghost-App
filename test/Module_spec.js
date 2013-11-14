/*global describe, it*/
'use strict';

var _ = require('underscore'),
    GhostApp = require('../');

describe('Module', function () {
    it('exports App', function () {
        _.isObject(GhostApp.App).should.equal(true);
    });
});