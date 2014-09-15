punycode = require('punycode')
esrever = require('esrever')
alphabet = [0x1F601,0x1F602,0x1F603,0x1F604,0x1F605,0x1F606]
base = alphabet.length

get_code = (i) ->
  return punycode.ucs2.encode([alphabet[i]])

exports.encode = (i) ->
  return get_code(i) if i is 0
  s = ""
  while i > 0
    s += get_code(i % base)
    i = parseInt(i / base, 10)

  esrever.reverse(s)

exports.decode = (s) ->
  i = 0
  decoded = punycode.ucs2.decode(s)
  for c in decoded
    i = i * base + alphabet.indexOf c
  i
