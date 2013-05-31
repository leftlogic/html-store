/**
 * html-store
 * Document-oriented key-value storage in an HTML file
 */

/**
 * Dependencies
 */

var _        = require('underscore'),
    cheerio  = require('cheerio'),
    Mustache = require('mustache'),
    tidy     = require('htmltidy').tidy;

/**
 * html-store
 */

var htmlstore = {};

/**
 * Templates
 */

htmlstore.templates = {
  metadata: '<meta name="{{ name }}" content="{{ content }}">',
  data: '<script data-htmlstore type="text" data-name="{{ name }}">\n{{& content }}\n</script>\n',
  css: '<style data-htmlstore data-name="{{ name }}">\n{{& content }}\n</style>\n'
};

// Precompile the templates
htmlstore.compiled = Object.keys(htmlstore.templates).reduce(function (memo, key) {
  memo[key] = Mustache.compile(htmlstore.templates[key]);
  return memo;
}, {});

/**
 * Parse
 */

htmlstore.parse = function (raw) {
  var $     = cheerio.load(raw),
      $meta = $('meta'),
      $data = $('[data-htmlstore]'),
      file  = Object.create(htmlstore.file),
      meta  = {},
      data  = {};

  // Pull metadata from meta tags
  $meta.each(function (i, elem) {
    var $elem = $(elem);
    meta[$elem.attr('name')] = $elem.attr('content');
    $elem.remove();
  });
  file.meta(meta);

  // Pull data from data tags
  $data.each(function (i, elem) {
    var $elem = $(elem);
    if (!$elem.attr('data-name')) return;
    data[$elem.attr('data-name')] = $elem.html().trim();
    $elem.remove();
  });
  file.set(data);

  // Add raw HTML back for re-rendering later
  file.raw = $.html().replace(/\n{2,}/g, '\n').trim();

  return file;
};

/**
 * File
 */

htmlstore.file = {

  init: function (raw) {
    this.raw = (''+raw).trim();
    return this;
  },

  /**
   * Set data to be put in the body of the document
   */
  set: function (obj) {
    this.data = _.extend({}, this.data, obj);
    return this;
  },

  /**
   * Set metadata to be put in the head of the document
   */
  meta: function (obj) {
    this.metadata = _.extend({}, this.metadata, obj);
    return this;
  },

  /**
   * Render HTML from the current file object.
   * Synchronous, unless it's passed a callback where it tidies the HTML.
   */
  render: function (cb) {
    var $      = cheerio.load(this.raw),
        $head  = $('head'),
        $title = $('title'),
        $body  = $('body');

    $body = ($body.length ? $body : $.root());

    // Add metadeta
    Object.keys(this.metadata).forEach(function (key) {
      var data = { name: key, content: this.metadata[key] },
          output = htmlstore.compiled.metadata(data);
      // If there's a head, add to it
      if ($head.length) {
        return $head.append('\n').append(output);
      }
      // Otherwise try after the title
      if ($title.length) {
        return $title.after('\n').after(output);
      }
      // Meh, just stick it on the body
      $body.append('\n').append(output);
    }.bind(this));

    // Add data
    Object.keys(this.data).forEach(function (key) {
      var data = { name: key, content: this.data[key] };
          template = htmlstore.compiled.data;
      if (key === 'css') {
        template = htmlstore.compiled.css;
      }
      var output = template(data);
      $body.append('\n').append(output);
    }.bind(this));

    $body.append('\n');

    // Send it on back, or tidy it
    var html = $.html().trim();
    if (!cb) return html;
    return tidy(html, {
      indent: 'auto',
      wrap: 0
    }, cb);
  },

  toString: function (cb) {
    return this.render(db);
  }

};

module.exports = htmlstore;