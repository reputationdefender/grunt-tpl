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
    var files = [
          'test/templates/a.mustache',
          'test/templates/b.tpl',
          'test/templates/c'
        ],
        namespace = 't';

    test.equal(
      grunt.helper('tpl', files, namespace),
      'this[\'t\'] = this[\'t\'] || {};\n\nthis[\'t\'][\'a\'] = \'Hello {{a}}\';\n\nthis[\'t\'][\'b\'] = \'<ul>{{#items}}  <li>{{.}}</li>{{/items}}</ul>\';\n\nthis[\'t\'][\'c\'] = \'template {{c}}\';',
      'It should concatenate template files'
    );

    test.done();
  }
};
