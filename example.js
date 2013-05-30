var htmldb = require('./');

/**
 * Parse minimal html file and add data
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

console.log(bin.render());

console.log();
console.log();
console.log();

/**
 * Parse larger html file and add data
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

console.log(bin.render());

console.log();
console.log();
console.log();

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

bin.render(function (err, html) {
  console.log(html);
});