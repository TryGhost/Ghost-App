/*global describe, it*/
'use strict';

var _ = require('lodash'),
    GhostApp = require('../');

describe('Module', function () {
    it('exports App directly', function () {
        _.isObject(GhostApp).should.be.true();
    });
});
