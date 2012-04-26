# grunt-tpl

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

### Example

Assume you have three Mustache templates named `a.mustache`, `b.tpl`, and `c` in a directory `test/templates/`.

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
    "simple/path/t.js": ["test/templates/*"]
  }

  // ... other configs
});
```

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
2012/04/25 - v0.1.0 - Initial release.

## License
Copyright (c) 2012 Max Beatty
Licensed under the MIT license.
