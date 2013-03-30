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
  grunt.registerMultiTask('tpl', 'Concatenate templates to one object in one file.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      force: false
    });

    if (this.target[this.target.length - 1] === '/') {
      grunt.fail.warn("never use path as filename");
    }

    grunt.verbose.writeflags(options, 'Options');

    // get the namespace from the destination
    var namespace = this.target.substring(this.target.lastIndexOf('/') + 1);

    // if filename has extension, remove it
    namespace = namespace.substring(0, namespace.lastIndexOf('.')) || namespace;
    
    namespace = "this['" + namespace + "']";

    var contents = namespace + " = " + namespace + " || {};\n\n";

    this.filesSrc.forEach(function(filepath) {
      if (!grunt.file.exists(filepath)) { return; }
      grunt.log.write('Templating "' + filepath + '"...\n');

      try {
        var content = grunt.file.read(filepath),
            // get the template name from the source file
            templateName = filepath.substring(filepath.lastIndexOf('/') + 1);
        content = content.replace(/(\r\n|\n|\r)/gm,"");
        // just in case someone is using templates without file extensions, remove the extension
        templateName = templateName.substring(0, templateName.lastIndexOf('.')) || templateName;
        // store as t["namespace"] = 'content';
        contents += namespace + "['" + templateName + "'] = '"+ content +"';\n\n";
      } catch (e) {
        grunt.log.error();
        grunt.verbose.error(e);
        grunt.fail.warn('Templating operation failed');
      }
    });

    // now that all the files are combined, write them to a single target file
    try {
      grunt.file.write(this.target, contents);
      grunt.log.ok();
    } catch (e) {
      grunt.log.error();
      grunt.verbose.error(e);
      grunt.fail.warn('Writing of template failed');
    }
  });
};
