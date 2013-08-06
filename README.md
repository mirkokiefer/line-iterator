#line-iterator

Iterate over streams (actually iterators) by line.

To iterate over lines of a stream you need to wrap it in an iterator using [stream-iterator](https://github.com/mirkokiefer/stream-iterator).

``` js
var createLineIterator = require('line-iterator')
var createStreamIterator = require('stream-iterator')

var fileStream = fs.createReadStream('your_file.txt', {encoding: 'utf8'})

// wrap the file stream in an iterator
var fileIterator = createStreamIterator(fileStream)

// transform the file iterator into a line iterator
var lineIterator = createLineIterator(fileIterator)

// call next() repeatedly to iterate over lines
lineIterator.next(function(err, line) {
  // first line
})
```

##Contributors

- Mirko Kiefer ([@mirkokiefer](https://github.com/mirkokiefer))
- Michael Still