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

var htmldb = {};

/**
 * Templates
 */

htmldb.templates = {
  metadata: '<meta name="{{ name }}" content="{{ content }}">',
  data: '<script type="text" data-name="{{ name }}">\n{{ content }}\n</script>\n'
};

// Precompile the templates
htmldb.compiled = Object.keys(htmldb.templates).reduce(function (memo, key) {
  memo[key] = Mustache.compile(htmldb.templates[key]);
  return memo;
}, {});

/**
 * File
 */

htmldb.file = {

  init: function (raw) {
    this.raw = raw;
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
          output = htmldb.compiled.metadata(data);
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
      var data = { name: key, content: this.data[key] },
          output = htmldb.compiled.data(data);
      $body.append('\n').append(output);
    }.bind(this));

    $body.append('\n');

    // Send it on back, or tidy it
    var html = $.html();
    if (!cb) return html;
    return tidy(html, {
      indent: 'auto',
      wrap: 0
    }, cb);
  }

};

module.exports = htmldb;