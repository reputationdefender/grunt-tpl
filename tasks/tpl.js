/*
 * grunt-tpl
 * https://github.com/maxbeatty/grunt-tpl
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

  grunt.registerMultiTask('tpl', 'Concatenate templates to one object in one file.', function() {
    if (this.file.dest[this.file.dest.length - 1] === '/') {
      grunt.fatal('never use path as filename');
      return false;
    }

    var files = grunt.file.expand(this.file.src),
    // use destination file for namespace
        namespace = this.file.dest.substring(this.file.dest.lastIndexOf('/') + 1);

    // if filename has extension, remove it
    namespace = namespace.substring(0, namespace.lastIndexOf('.')) || namespace;

    grunt.file.write(this.file.dest, grunt.helper('tpl', files, namespace));

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln('File "' + this.file.dest + '" created.');
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('tpl', function(files, namespace) {

    namespace = "this['" + namespace + "']";

    // this["ns"] = this["ns"] || {};
    var contents = namespace + " = " + namespace + " || {};\n\n";

    contents += files ? files.map(function(filepath) {

      var templateName = filepath.substring(filepath.lastIndexOf('/') + 1),
          raw = grunt.file.read(filepath),
          content = raw.replace(/(\r\n|\n|\r)/gm,"");
      // just incase someone is using templates without file extensions
      templateName = templateName.substring(0, templateName.lastIndexOf('.')) || templateName;

      return namespace + "['" + templateName + "'] = '"+ content +"';";
    }).join("\n\n") : "";

    // return object of template names and concatenated templates
    return contents;
  });

};
