var htmlstore = require('../');

/**
 * Parse minimal html file and add data
 */

var inputBin = Object.create(htmlstore.file);

inputBin.init([
  '<!doctype html>',
  '<title>My example bin</title>',
  '<h1>Sup, world?</h1>'
].join('\n'));

inputBin.set({
  html: '<h1>Hello, world</h1>',
  css: 'body { background: red; }',
  js: 'console.log("Hello, world.");',
  markdown: '# Hello, world',
  coffeescript: 'console.log "Hello, world."'
});

inputBin.meta({
  title: 'Something nice.',
  description: 'I love kittens.'
});

console.log(inputBin.render());

var bin = htmlstore.parse(inputBin.render());

console.log(bin);
console.log();
console.log();
console.log();
console.log(bin.render());