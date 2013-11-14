'use strict';

var helpers = require('./helpers'),
    App;

/**
 * App is the base class for a standard Ghost App.  Includes empty handlers for life cycle events.
 * @class
 * @parameter {Ghost} The current Ghost app instance
 */
App = function (ghost) {
    this.app = ghost;

    this.initialize();
};

/**
 * A method that is run after the constructor and allows for special logic
 */
App.prototype.initialize = function () {
    return;
};

/** 
 * A method that will be called on installation.
 * Can optionally return a promise if async.
 * @parameter {Ghost} The current Ghost app instance
 */
App.prototype.install = function () {
    return;
};

/** 
 * A method that will be called on uninstallation.
 * Can optionally return a promise if async.
 * @parameter {Ghost} The current Ghost app instance
 */
App.prototype.uninstall = function () {
    return;
};

/** 
 * A method that will be called when the App is enabled.
 * Can optionally return a promise if async.
 * @parameter {Ghost} The current Ghost app instance
 */
App.prototype.activate = function () {
    return;
};

/** 
 * A method that will be called when the App is disabled.
 * Can optionally return a promise if async.
 * @parameter {Ghost} The current Ghost app instance
 */
App.prototype.deactivate = function () {
    return;
};

// Offer an easy to use extend method.
App.extend = helpers.extend;

module.exports = App;