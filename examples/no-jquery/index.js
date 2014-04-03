var App = require('ghost-app'),
    _   = require('lodash'),

    FilterApp;


FilterApp = App.extend({
    filters: {
        ghost_foot: 'handleGhostFoot'
    },

    handleGhostFoot: function (ghost_foot) {
        return _.reject(ghost_foot, function (item) {
            return (/jquery\.js/.test(item));
        });
    }
});


module.exports = FilterApp;