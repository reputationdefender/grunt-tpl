/*
 * grunt-tpl
 * http://github.com/reputation/grunt-tpl
 *
 * Copyright (c) 2013 Reputation, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    clean: {
      all: ["/tmp/tpl"],
      options: {
        force: true
      }
    },

    // Configuration to be run (and then tested).
    tpl: {
      "/tmp/tpl/t.js": [
        'test/templates/a.mustache',
        'test/templates/b.tpl',
        'test/templates/c'
      ]
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the 'test' task is run, first this plugin's task(s),
  // then test the result.
  grunt.registerTask('test', ['clean', 'tpl', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
