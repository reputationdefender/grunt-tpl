/*
 * grunt-hogan
 * https://github.com/maxbeatty/grunt-hogan
 *
 * Copyright (c) 2012 Max Beatty
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerTask('hogan', 'Your task description goes here.', function() {
    grunt.log.write(grunt.helper('hogan'));
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('hogan', function() {
    return 'hogan!!!';
  });

};
