var configureGrunt = function (grunt) {

        // load all grunt tasks
        require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

        var cfg = {
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
        grunt.registerTask('validate', 'Run tests and lint code', ['mochacli']);

        grunt.registerTask('default', 'Run tests and lint code', ['validate']);
    };

module.exports = configureGrunt;
