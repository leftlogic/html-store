var htmlstore = require('../'),
    fix = require('./fixtures');

var t = require('tap'),
    _ = require('underscore');

// Import Underscore.string to separate object
_.str = require('underscore.string');
// Mix in non-conflict functions to Underscore namespace if you want
_.mixin(_.str.exports());
// All functions, include conflict, will be available through _.str object
_.str.include('Underscore.string', 'string'); // => true

t.test('parse', function (t) {

  t.test('render then parse', function (t) {

    var originalBin = fix.headAndBody,
        originalHtml = originalBin.render();

    var bin = htmlstore.parse(originalHtml),
        html = bin.render();

    t.deepEqual(bin.data, originalBin.data, 'Data is the same');
    t.deepEqual(bin.metadata, originalBin.metadata, 'Metadata is the same');
    t.end();

  });

  t.test('render then parse', function (t) {

    var originalBin = fix.minimal,
        originalHtml = originalBin.render();

    var bin = htmlstore.parse(originalHtml),
        html = bin.render();

    t.deepEqual(bin.data, originalBin.data, 'Data is the same');
    t.deepEqual(bin.metadata, originalBin.metadata, 'Metadata is the same');
    t.end();

  });

  t.end();
});