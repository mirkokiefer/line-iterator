#line-iterator
[![Build Status](https://travis-ci.org/mirkokiefer/line-iterator.png?branch=master)](https://travis-ci.org/mirkokiefer/line-iterator)

[![NPM](https://nodei.co/npm/line-iterator.png)](https://nodei.co/npm/line-iterator/)

Iterate over streams (actually iterators) by line.

To iterate over lines of a stream you need to wrap it in an iterator using [stream-iterator](https://github.com/mirkokiefer/stream-iterator).

``` js
var createLineIterator = require('line-iterator')
var iterators = require('async-iterators')

var fileStream = fs.createReadStream('your_file.txt', {encoding: 'utf8'})

// wrap the file stream in an iterator
var fileIterator = iterators.fromReadableStream(fileStream)

// transform the file iterator into a line iterator
var lineIterator = createLineIterator(fileIterator)

// call next() repeatedly to iterate over lines
lineIterator.next(function(err, line) {
  // first line
})
```

##Contributors

- Mirko Kiefer ([@mirkokiefer](https://github.com/mirkokiefer))
- Michael Still ([@Mitb](https://github.com/Mitb))