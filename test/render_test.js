var htmldb = require('../'),
    fix = require('./fixtures');

var t = require('tap'),
    _ = require('underscore');

// Import Underscore.string to separate object
_.str = require('underscore.string');
// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());
// All functions, include conflict, will be available through _.str object
_.str.include('Underscore.string', 'string'); // => true

t.test('render', function (t) {

  t.test('with head and body', function (t) {

    /**
     * Parse larger html file and add data
     */

    var html = fix.headAndBody.render();

    t.ok(html, 'Truthy result was returned');

    [
      '<script type="text" data-name="html">',
      'body { background: red; }',
      '<script type="text" data-name="markdown">',
      '# Hello, world',
      '<meta name="title" content="Something nice.">',
      '<meta name="description" content="I kill kittens.">'
    ].forEach(function (str) {
      t.ok(_.str.include(html, str), 'Includes ' + str);
    });

    t.end();

  });

  t.test('with no head or body', function (t) {

    /**
     * Parse minimal html file and add data
     */

    var html = fix.minimal.render();

    t.ok(html, 'Truthy result was returned');

    [
      '<script type="text" data-name="html">',
      'body { background: red; }',
      '<script type="text" data-name="markdown">',
      '# Hello, world',
      '<meta name="title" content="Something nice.">',
      '<meta name="description" content="I kill kittens.">'
    ].forEach(function (str) {
      t.ok(_.str.include(html, str), 'Includes ' + str);
    });

    t.end();

  });

});