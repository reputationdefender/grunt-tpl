/*
 * grunt-tpl
 * https://github.com/reputation/grunt-tpl
 *
 * Copyright (c) 2013 Reputation.com
 * Contributors: Max Beatty, Jeff Harnois
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // filename conversion for templates keys : Remove filename extension
  // And keep full filepath except if it contains a templates/ dir
  var defaultProcessName = function(filename) {
    filename = filename.slice(filename.lastIndexOf('templates/'), filename.length);
    filename = filename.slice(filename.indexOf('/') + 1, filename.length);
    if (filename.indexOf('.') !== -1) {
      filename = filename.slice(0, filename.lastIndexOf('.'));
    }
    return filename;
  };

  grunt.registerMultiTask('tpl', 'Concatenate templates to one object in one file.', function() {
    var lf = grunt.util.linefeed;
    var helpers = require('grunt-lib-contrib').init(grunt);
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      namespace: 'templates',
      templateSettings: {},
      processContent: function (src) { return src; },
      separator: lf + lf
    });

    // assign filename transformation functions
    var processName = options.processName || defaultProcessName;

    grunt.verbose.writeflags(options, 'Options');

    var nsInfo;
    if (options.namespace !== false) {
      nsInfo = helpers.getNamespaceDeclaration(options.namespace);
    }

    this.files.forEach(function(f) {
      var output = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return grunt.file.isFile(filepath);
        }
      })
      .map(function(filepath) {
        var src = options.processContent(grunt.file.read(filepath));
        var content, filename;

        try {
          // get the template name from the source file
          filename = processName(filepath);

          content = src.replace(/(\r\n|\n|\r)/gm,"").replace("\'","&rsquo;");
        } catch (e) {
          grunt.log.error(e);
          grunt.fail.warn('template failed to compile.');
        }

        return nsInfo.namespace+'['+JSON.stringify(filename)+"] = '"+content+"';";
      });

      if (output.length < 1) {
        grunt.log.warn('Destination not written because content files were empty.');
      } else {
        if (options.namespace !== false) {
          output.unshift(nsInfo.declaration);
        }
        grunt.file.write(f.dest, output.join(grunt.util.normalizelf(options.separator)));
        grunt.log.writeln('File "' + f.dest + '" created.');
      }
    });
  });
};
