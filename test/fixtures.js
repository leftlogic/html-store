var htmlstore = require('../');

module.exports = {

  headAndBody: Object.create(htmlstore.file)
    .init([
      '<!doctype html>',
      '<head>',
      '  <title>My example bin</title>',
      '</head>',
      '<body>',
      '  <h1>Sup, world?</h1>',
      '</body>'
    ].join('\n'))
    .set({
      html: '<h1>Hello, world</h1>',
      css: 'body { background: red; }',
      js: 'console.log("Hello, world.");',
      markdown: '# Hello, world',
      coffeescript: 'console.log "Hello, world."'
    })
    .meta({
      title: 'Something nice.',
      description: 'I love kittens.'
    }),

  minimal: Object.create(htmlstore.file)
    .init([
      '<!doctype html>',
      '<title>My example bin</title>',
      '<h1>Sup, world?</h1>'
    ].join('\n'))
    .set({
      html: '<h1>Hello, world</h1>',
      css: 'body { background: red; }',
      js: 'console.log("Hello, world.");',
      markdown: '# Hello, world',
      coffeescript: 'console.log "Hello, world."'
    })
    .meta({
      title: 'Something nice.',
      description: 'I love kittens.'
    })

};