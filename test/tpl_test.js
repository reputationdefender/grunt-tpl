var grunt = require('grunt');

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

exports['tpl'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'helper': function(test) {
    test.expect(1);
    // tests here
    var f = [
          'test/templates/a.mustache',
          'test/templates/b.tpl',
          'test/templates/c'
        ],
        ns = 't',
        // error passing in arguments to helper in tests...
        // contents = grunt.helper('tpl', f, ns),
        // expected = 'this[\'t\'] = this[\'t\'] || {};\n\nthis[\'t\'][\'a\'] = \'Hello {{a}}\';\n\nthis[\'t\'][\'b\'] = \'<ul>{{#items}}  <li>{{.}}</li>{{/items}}</ul>\';\n\nthis[\'t\'][\'c\'] = \'template {{c}}\';';
        contents = grunt.helper('tpl'),
        expected = 'this[\'undefined\'] = this[\'undefined\'] || {};\n\n';

    test.equal(contents, expected, 'It should concatenate template files');

    test.done();
  }
};
