
var assert = require('assert')
var fs = require('fs')
var createLineIterator = require('../lib/index')
var iterators = require('async-iterators')
var async = require('async')

var testData = []
for (var i=0; i<10000; i++) {
  testData.push('this is line ' + i)
}

var testFile = __dirname + '/test.txt'
var writeTestFile = function(cb) {
  var writeStream = fs.createWriteStream(testFile)
  async.forEach(testData, function(each, cb) {
    writeStream.write(each + '\n', cb)
  }, function() {
    writeStream.close()
    cb()
  })
}


describe('line-stream', function() {
  before(writeTestFile)
  after(function(done) {
    fs.unlink(testFile, done)
  })
  it('should read from a character stream and transform to a line stream', function(done) {
    var fileStream = fs.createReadStream(testFile, {encoding: 'utf8'})
    var fileIterator = iterators.fromReadableStream(fileStream)
    var lineIterator = createLineIterator(fileIterator)
    iterators.toArray(lineIterator, function(err, res) {
      assert.equal(res.length, 10001)
      var expectedRes = testData.concat([''])
      assert.deepEqual(res, expectedRes)
      done()
    })
  })
})