/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

'use strict';

var grunt = require('grunt');

exports.tpl = {
  long: function(test) {
    test.expect(1);

    var contents = grunt.file.read('/tmp/tpl/t.js'),
        expected ="this[\"templates\"] = this[\"templates\"] || {};\n\nthis[\"templates\"][\"c\"] = \'template {{c}}\';\n\nthis[\"templates\"][\"here/a\"] = \'Hello {{a}}\';\n\nthis[\"templates\"][\"there/b\"] = \'<ul>{{#items}}  <li>{{.}}</li>{{/items}}</ul>\';";

    test.equal(contents, expected, 'It should concatenate template files');

    test.done();
  }
};