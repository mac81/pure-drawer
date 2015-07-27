/*!
 * align-text <https://github.com/jonschlinkert/align-text>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var typeOf = require('kind-of');
var repeat = require('repeat-string');
var longest = require('longest');

module.exports = function alignText(val, fn) {
  var lines, type = typeOf(val);

  if (type === 'array') {
    lines = val;
  } else if (type === 'string') {
    lines = val.split(/[\r\n]/);
  } else {
    throw new TypeError('align-text expects a string or array.');
  }

  var len = lines.length;
  var max = longest(lines);
  var res = [], i = 0;

  while (len--) {
    var line = lines[i++];
    var diff = typeof fn === 'function'
      ? fn(line.length, max.length, line, lines, i)
      : typeof fn === 'number' ? fn : 0;

    if (typeOf(diff) === 'number') {
      res.push(repeat(' ', diff) + line);
    } else if (typeOf(diff) === 'object') {
      var result = repeat(diff.character || ' ', diff.indent || 0);
      res.push((diff.prefix || '') + result + line);
    }
  }

  if (type === 'array') return res;
  return res.join('\n');
};
