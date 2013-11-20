# grunt-tpl

[![Build Status](https://travis-ci.org/popox/grunt-tpl.png)](https://travis-ci.org/popox/grunt-tpl)

Concatenate templates to one object in one file.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-tpl`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-tpl');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation

This task is meant to concatenate templates of any variety to one file with with one object to be compiled client-side.

### Project Configuration
This example shows a brief overview of the [grunt.js gruntfile][getting_started] config properties used by the `tpl` task.

```javascript
// Project configuration.
grunt.initConfig({
  tpl: {
    "path/to/concatenated/template-file.js": ["array/of/paths/to/templates/**/*", "/exact/location/of/template.mustache"]
  }
});
```

Specify the paths to the concatenated template files as keys. That filename (extension or not) will be used to namespace the Object. The values can be a string or array of strings to relative or absolute paths to your template files. You can use wildcards such as `/**/*` and `/*.js` as documented by [minimatch](https://github.com/isaacs/minimatch).
The key to access each given template file will by default be the filepath (without the extension) omitting the path before any 'templates/' directory found.

#### Options

You can specify an ```options``` node in the grunt task configuration to override:

- the ```namespace``` used to export the templates
- the ```processName``` function that will return the key to use for each template

### Example

Assume you have three Mustache templates named `a.mustache`, `b.tpl`, and `c` in respective directories `test/templates/here` `test/templates/there` and `test/templates`.

#### a.mustache

    Hello {{a}}

#### b.tpl

    <ul>
    {{#items}}
      <li>{{.}}</li>
    {{/items}}
    </ul>

#### c

    template {{c}}

If you want them concatenated into the file `simple/path/t.js`, your config would be:

```javascript
grunt.initConfig({
  // ... other configs

  tpl: {
    "simple/path/t.js": ["test/templates/**/*"]
  }

  // ... other configs
});
```

The generated file will then look like:

#### t.js

```javascript
this['t'] = this['t'] || {};

this['t']['here/a'] = 'Hello {{a}}';

this['t']['there/b'] = '<ul>{{#items}}  <li>{{.}}</li>{{/items}}</ul>';

this['t']['c'] = 'template {{c}}';
```

If you override the options to have only the filenames of your templates to be used as keys in the object with this grunt configuration:

```
grunt.initConfig({
    tpl: {
      task: {
        options: {
          namespace: "t",
          processName: function(filename) {
            filename = filename.slice(filename.lastIndexOf('/') + 1, filename.length);
            if (filename.indexOf('.') !== -1) {
              filename = filename.slice(0, filename.lastIndexOf('.'));
            }
            return filename;
          }
        },
        files: {
          "/tmp/tpl/t.js": ['test/templates/**/*']
        }
      }
    }
});
```

the resulting file will be

#### t.js

```javascript
this['t'] = this['t'] || {};

this['t']['a'] = 'Hello {{a}}';

this['t']['b'] = '<ul>{{#items}}  <li>{{.}}</li>{{/items}}</ul>';

this['t']['c'] = 'template {{c}}';
```


You can then compile these at any time.

```javascript
var h = Hogan.compile(window.t['a']);
h.render(info);
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History

2013/03/28 - v1.0.0 - Update to grunt 4.0.0.

2012/04/25 - v0.1.0 - Initial release.

## License
Copyright (c) 2013 Reputation.com
Licensed under the MIT license.
