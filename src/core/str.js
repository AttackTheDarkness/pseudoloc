/**
* Str.js
*
* Replaces all characters in str with pseudolocalized version according to
* pseudoloc.options.
*
* (c) 2013 Bill, BunKat LLC.
* Pseudoloc is freely distributable under the MIT license.
* For all details and documentation:
*     http://bunkat.github.com/pseudoloc
*/
pseudoloc.str = function(str) {
  var opts = pseudoloc.option,
      startdelim = opts.startDelimiter || opts.delimiter,
      enddelim = opts.endDelimiter || opts.delimiter,
      re = new RegExp(startdelim + '\\s*[\\w\\.\\s*]+\\s*' + enddelim, 'g'),
      m, tokens = [], i = 0, tokenIdx = 0, result = '', c, pc, j;

  while((m = re.exec(str))) {
    tokens.push(m);
  }

  var token = tokens[tokenIdx++] || {index: -1};
  while(i < str.length) {

    if(token.index === i) {
      result += token[0];
      i += token[0].length;
      token = tokens[tokenIdx++] || {index: -1};
      continue;
    }

    c = opts.override !== undefined ? opts.override : str[i];
    pc = pseudoloc.table[c];
    if (pc) {
      // Rotate all alternate characters forward and stick the current character at the end
      pseudoloc.table[c] = pc.substr(1,pc.length-1) + pc.substr(0,1);
      c = pc[0];
    }
    result += c;
    i++;
  }

  return opts.prepend + pseudoloc.pad(result, opts.extend) + opts.append;
};