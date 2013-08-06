
var assert = require('assert')
var fs = require('fs')
var createLineIterator = require('../lib/index')
var createStreamIterator = require('stream-iterator')
var iterators = require('async-iterators')

describe('line-stream', function() {
  it('should read from a character stream and transform to a line stream', function(done) {
    var fileStream = fs.createReadStream(__dirname + '/test.txt', {encoding: 'utf8'})
    var fileIterator = createStreamIterator(fileStream)
    var lineIterator = createLineIterator(fileIterator)
    console.log('ok')
    iterators.map(lineIterator, function(err, each) { return each }, function(err, res) {
      var expectedRes = ["line one","line two","line three"]
      assert.deepEqual(res, expectedRes)
      done()
    })
  })
})