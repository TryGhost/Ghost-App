'use strict';

var _ = require('lodash'),
    helpers = require('./helpers'),
    App;

/**
 * App is the base class for a standard Ghost App.  Includes empty handlers for life cycle events.
 * @class
 * @parameter {Ghost} The current Ghost app instance
 */
App = function (ghost) {
    this.ghost = ghost;

    this.initialize();
};

/**
 * A mapping of filter names to method names
 */
App.prototype.filters = {};

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
    this.registerFilters();
};

/**
 * A method that will be called when the App is disabled.
 * Can optionally return a promise if async.
 * @parameter {Ghost} The current Ghost app instance
 */
App.prototype.deactivate = function () {
    this.deregisterFilters();
};

/**
 * Register Ghost filters based on a passed in mapping object
 * @parameter {Object} A mapping of filter names to methods names on the app instance.
 */
App.prototype.registerFilters = function (filters) {
    var self = this;
    this._eachFilter(filters, function (filterName, filterHandlerArgs) {
        var parms = [filterName].concat(filterHandlerArgs);

        self.ghost.filters.register.apply(self.ghost.filters, parms);
    });
};

/**
 * Unregister Ghost filters based on a passed in mapping object
 * @parameter {Object} A mapping of filter names to methods names on the app instance.
 */
App.prototype.deregisterFilters = function (filters) {
    var self = this;

    this._eachFilter(filters, function (filterName, filterHandlerArgs) {
        var parms = [filterName].concat(filterHandlerArgs);

        self.ghost.filters.deregister.apply(self.ghost.filters, parms);
    });
};

/**
 * Iterate through each passed in filter (or this.filters if nothing passed)
 * and normalize the arguments that should be passed to *registerFilter methods
 * @parameter {Object} optional mapping of filter names to methods names on the app instance.
 * @parameter {Function} the callback to run for each filter key value mapping.
 */
App.prototype._eachFilter = function (filters, filterDataHandler) {
    filters = filters || this.filters;

    // Allow passing a function as the filters
    if (_.isFunction(filters)) {
        filters = filters();
    }

    var self = this;

    _.each(filters, function (filterHandlerArgs, filterName) {
        // Iterate through and determine if there is a priority or not,
        // account for the possibility there is only one value in the array.
        if (_.isArray(filterHandlerArgs) && filterHandlerArgs.length !== 1) {
            filterHandlerArgs[1] = self[filterHandlerArgs[1]];
        } else {
            filterHandlerArgs = [self[filterHandlerArgs]];
        }

        filterDataHandler(filterName, filterHandlerArgs);
    });
};

// Offer an easy to use extend method.
App.extend = helpers.extend;

module.exports = App;
