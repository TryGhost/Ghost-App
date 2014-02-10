'use strict';

var _ = require('lodash'),
    when = require('when'),
    lifeCycleMethods = ['install', 'uninstall', 'activate', 'deactivate'];

// Taken from Backbone 1.0.0 (http://backbonejs.org)
// Helper function to correctly set up the prototype chain, for subclasses.
// Similar to `goog.inherits`, but uses a hash of prototype properties and
// class properties to be extended.
var extend = function (protoProps, staticProps) {
    var parent = this,
        child,
        Surrogate;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
        child = protoProps.constructor;
    } else {
        child = function () { return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    Surrogate = function () { this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) {

        // Iterate through our life cycle methods and wrap them so they
        // call the parent class first
        _.each(lifeCycleMethods, function (methodName) {
            // Check that the method is defined in both the parent and
            // new class
            if (!(_.has(protoProps, methodName) &&
                  _.has(parent.prototype, methodName) &&
                  _.isFunction(protoProps[methodName]))) {
                return;
            }

            protoProps[methodName] = _.wrap(protoProps[methodName], function (newMethod) {
                // Grab the arguments passed to the function; passed
                // as arguments[1..]
                var self = this,
                    args = _.toArray(arguments).slice(1);

                // Call the parent class method first
                return when(parent.prototype[methodName].apply(self, args)).then(function () {
                    // Call the new method
                    return newMethod.apply(self, args);
                });
            });
        });

        _.extend(child.prototype, protoProps);
    }

    // Set a convenience property in case the parent's prototype is needed
    // later.
    /*jshint camelcase:false */
    child.__super__ = parent.prototype;
    /*jshint camelcase:true */

    return child;
};

module.exports = {
    extend: extend
};