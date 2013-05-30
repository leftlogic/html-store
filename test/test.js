var htmldb = require('../');

var t = require('tap'),
    S = require('string');

t.test('render', function (t) {

  t.test('with head and body', function (t) {

    /**
     * Parse larger html file and add data & tidy
     */

    var bin = Object.create(htmldb.file);

    bin.init([
      '<!doctype html>',
      '<head>',
      '  <title>My example bin</title>',
      '</head>',
      '<body>',
      '  <h1>Sup, world?</h1>',
      '</body>'
    ].join('\n'));

    bin.set({
      html: '<h1>Hello, world</h1>',
      css: 'body { background: red; }',
      js: 'console.log("Hello, world.");',
      markdown: '# Hello, world',
      coffeescript: 'console.log "Hello, world."'
    });

    bin.meta({
      title: 'Something nice.',
      description: 'I kill kittens.'
    });

    var html = bin.render(),
        wrapped = S(html);

    t.ok(html, 'Truthy result was returned');

    [
      '<script type="text" data-name="html">',
      'body { background: red; }',
      '<script type="text" data-name="markdown">',
      '# Hello, world'
    ].forEach(function (str) {
      t.ok(wrapped.include(str), 'Includes ' + str);
    });

    t.end();

  });

  t.test('with no head or body', function (t) {

    /**
     * Parse larger html file and add data & tidy
     */

    var bin = Object.create(htmldb.file);

    bin.init([
      '<!doctype html>',
      '<title>My example bin</title>',
      '<h1>Sup, world?</h1>'
    ].join('\n'));

    bin.set({
      html: '<h1>Hello, world</h1>',
      css: 'body { background: red; }',
      js: 'console.log("Hello, world.");',
      markdown: '# Hello, world',
      coffeescript: 'console.log "Hello, world."'
    });

    bin.meta({
      title: 'Something nice.',
      description: 'I kill kittens.'
    });

    var html = bin.render(),
        wrapped = S(html);

    t.ok(html, 'Truthy result was returned');

    [
      '<script type="text" data-name="html">',
      'body { background: red; }',
      '<script type="text" data-name="markdown">',
      '# Hello, world',
      '<meta name="title" content="Something nice.">',
      '<meta name="description" content="I kill kittens.">'
    ].forEach(function (str) {
      t.ok(wrapped.include(str), 'Includes ' + str);
    });

    t.end();

  });

});