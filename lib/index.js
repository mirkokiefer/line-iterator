
var EventEmitter = require('events').EventEmitter

var createLineIterator = function(fileIterator) {
  var currentBuffer = ''
  var buffers = []
  var hasEnded = false
  var lineEvents = new EventEmitter()

  var next = function(cb) {
    console.log('next', hasEnded, buffers)
    if (hasEnded) return cb(null, undefined)
    if (buffers.length) {
      cb(null, buffers.shift())
    } else {
      iterate()
      lineEvents.once('line_finished', function() {
        next(cb)
      })
    }
  }

  var appendToBuffer = function(data) {
    var newLineIndex = data.indexOf('\n')
    var line = newLineIndex > -1 ? data.slice(0, newLineIndex) : data
    currentBuffer += line
    if (newLineIndex > -1) {
      var rest = data.slice(newLineIndex + 1)
      buffers.push(currentBuffer)
      currentBuffer = ''
      lineEvents.emit('line_finished')
      appendToBuffer(rest)
    }
  }

  var iterate = function() {
    fileIterator.next(function(err, data) {
      console.log(err, data)
      if (data === undefined) {
        appendToBuffer('\n')
        console.log('has ended', buffers)
        hasEnded = true
      } else {
        appendToBuffer(data)
        iterate()
      }
    })
  }

  return {next: next}
}

module.exports = createLineIterator
