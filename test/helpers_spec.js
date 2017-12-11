/*global describe, beforeEach, afterEach, it*/
'use strict';

var _ = require('lodash'),
    should = require('should'),
    sinon = require('sinon'),
    App = require('../lib/App'),
    helpers = require('../lib/helpers.js'),

    sandbox = sinon.sandbox.create();

describe('Helpers', function () {
    var fakeGhost;

    beforeEach(function () {

        fakeGhost = {
            filters: {
                register: sandbox.stub(),
                deregister: sandbox.stub()
            }
        };
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('can extend a class', function () {
        function Class1() { return; }

        Class1.prototype.method1 = function () { return; };

        Class1.extend = helpers.extend;

        var Class2 = Class1.extend({
            method2: function () { return; }
        });

        should.exist(Class2.prototype.method1);
        should.exist(Class2.prototype.method2);
    });

    it('wraps App life cycle events', function (done) {
        var newInstallStub = sandbox.stub(),
            NewApp = App.extend({
                install: newInstallStub
            }),
            baseInstallSpy = sandbox.spy(App.prototype, 'install'),
            newApp = new NewApp(fakeGhost);

        newApp.install(fakeGhost).then(function () {
            baseInstallSpy.calledWith(fakeGhost).should.be.true();
            baseInstallSpy.calledBefore(newInstallStub).should.be.true();

            newInstallStub.calledWith(fakeGhost).should.be.true();

            done();
        }, done);
    });
});
