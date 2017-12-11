/*global describe, beforeEach, afterEach, it*/
'use strict';

var _ = require('lodash'),
    sinon = require('sinon'),
    App = require('../lib/App'),

    sandbox = sinon.sandbox.create();

describe('App', function () {
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

    it('has correct methods', function () {
        var app = new App(fakeGhost),
            methods = [
                'initialize',
                'install',
                'uninstall',
                'activate',
                'deactivate'
            ];

        _(methods).each(function (method) {
            _.isFunction(app[method]).should.be.true();
        });
    });

    it('stores ghost api as this.ghost', function () {
        var app = new App(fakeGhost);

        app.ghost.should.equal(fakeGhost);
    });

    it('registers filters on activate', function (done) {
        var FilterApp = App.extend({
                filters: {
                    ghost_head: 'handleGhostHead',
                    ghost_foot: [9, 'handleGhostFoot'],
                    prePostRender: ['handlePrePostRender']
                },

                activate: function () {
                    // For testing this actually was run
                    this.otherThing = true;
                },

                handleGhostHead: sandbox.stub(),

                handleGhostFoot: sandbox.stub(),

                handlePrePostRender: sandbox.stub()
            }),
            app = new FilterApp(fakeGhost);

        app.activate().then(function () {
            app.otherThing.should.be.true();

            fakeGhost.filters.register.calledWithExactly('ghost_head', app.handleGhostHead).should.be.true();
            fakeGhost.filters.register.calledWithExactly('ghost_foot', 9, app.handleGhostFoot).should.be.true();
            fakeGhost.filters.register.calledWithExactly('prePostRender', app.handlePrePostRender).should.be.true();

            done();
        }, done);
    });
});
