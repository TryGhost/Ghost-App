var configureGrunt = function (grunt) {

        // load all grunt tasks
        require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

        var cfg = {
            // JSLint all the things!
            jslint: {
                app: {
                    directives: {
                        // node environment
                        node: true,
                        // browser environment
                        browser: false,
                        // allow dangling underscores in var names
                        nomen: true,
                        // allow to do statements
                        todo: true,
                        // don't require use strict pragma
                        sloppy: true
                    },
                    files: {
                        src: [
                            'lib/**/*.js',
                            'test/**/*.js',
                            '*.js'

                        ]
                    }
                }
            },
            mochacli: {
                options: {
                    ui: 'bdd',
                    require: ['should'],
                    reporter: 'spec'
                },

                all: ['test/*_spec.js']
            }
        };

        grunt.initConfig(cfg);

        // ## Running the test suite
        grunt.registerTask('validate', 'Run tests and lint code', ['jslint', 'mochacli']);

        grunt.registerTask('default', 'Run tests and lint code', ['validate']);
    };

module.exports = configureGrunt;