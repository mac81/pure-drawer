/*!
 * extglob <https://github.com/jonschlinkert/extglob>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * Module dependencies
 */

var isExtglob = require('is-extglob');
var re, cache = {};

/**
 * Expose `extglob`
 */

module.exports = extglob;

/**
 * Convert the given extglob `string` to a regex-compatible
 * string.
 *
 * ```js
 * var extglob = require('extglob');
 * extglob('!(a?(b))');
 * //=> '(?!a(?:b)?)[^/]*?'
 * ```
 *
 * @param {String} `str` The string to convert.
 * @param {Object} `options`
 *   @option {Boolean} [options] `esc` If `false` special characters will not be escaped. Defaults to `true`.
 *   @option {Boolean} [options] `regex` If `true` a regular expression is returned instead of a string.
 * @return {String}
 * @api public
 */

function extglob(str, opts) {
  opts = opts || {};
  var o = {}, i = 0;

  // create a unique key for caching by
  // combining the string and options
  var key = str
    + !!opts.regex
    + !!opts.contains
    + !!opts.escape;

  if (cache.hasOwnProperty(key)) {
    return cache[key];
  }

  if (!(re instanceof RegExp)) {
    re = regex();
  }

  var negate = false;

  while (isExtglob(str)) {
    var match = re.exec(str);
    if (!match) break;
    var prefix = match[1];

    var id = '__EXTGLOB_' + (i++) + '__';
    o[id] = wrap(match[3], prefix, opts.escape);
    str = str.split(match[0]).join(id);

    // use the prefix of the _last_ (outtermost) pattern
    if (prefix === '!') {
      negate = true;
    }
  }

  var keys = Object.keys(o);
  var len = keys.length;

  // we have to loop again to allow us to convert
  // patterns in reverse order (starting with the
  // innermost pattern first)
  while (len--) {
    var prop = keys[len];
    str = str.split(prop).join(o[prop]);
  }

  var result = opts.regex
    ? toRegex(str, opts.contains, negate)
    : str;

  // cache the result and return it
  return (cache[key] = result);
}

/**
 * Convert `string` to a regex string.
 *
 * @param  {String} `str`
 * @param  {String} `prefix` Character that determines how to wrap the string.
 * @param  {Boolean} `esc` If `false` special characters will not be escaped. Defaults to `true`.
 * @return {String}
 */

function wrap(str, prefix, esc) {
  switch (prefix) {
    case '!':
      return '(?!' + str + ')[^/]' + (esc ? '%%%~' : '*?');
    case '@':
      return '(?:' + str + ')';
    case '+':
      return '(?:' + str + ')+';
    case '*':
      return '(?:' + str + ')' + (esc ? '%%' : '*')
    case '?':
      return '(?:' + str + ')' + (esc ? '%~' : '?')
    default:
      return str;
  }
}

/**
 * extglob regex.
 */

function regex() {
  return /(\\?[@?!+*$]\\?)(\(([^()]*?)\))/;
}

/**
 * Create the regex to do the matching. If
 * the leading character in the `pattern` is `!`
 * a negation regex is returned.
 *
 * @param {String} `pattern`
 * @param {Boolean} `contains` Allow loose matching.
 * @param {Boolean} `negate` True if the pattern is a negation pattern.
 */

function toRegex(pattern, contains, negate) {
  var prefix = contains ? '^' : '';
  var after = contains ? '$' : '';
  pattern = ('(?:' + pattern + ')' + after);
  if (negate) {
    pattern = prefix + ('(?!^' + pattern + ').*$');
  }
  return new RegExp(prefix + pattern);
}
