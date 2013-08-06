
var EventEmitter = require('events').EventEmitter

var createLineIterator = function(fileIterator) {
  var currentBuffer = ''
  var buffers = []
  var hasEnded = false
  var lineEvents = new EventEmitter()

  var next = function(cb) {
    if (buffers.length) {
      cb(null, buffers.shift())
    } else if (hasEnded) {
      cb(null, undefined)
    } else {
      lineEvents.once('line_finished', function() {
        next(cb)
      })
      iterate()
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
      appendToBuffer(rest)
      return false
    } else {
      return true
    }
  }

  var iterate = function() {
    fileIterator.next(function(err, data) {
      console.log('data', err, data)
      if (data === undefined) {
        appendToBuffer('\n')
        hasEnded = true
        lineEvents.emit('line_finished')
      } else {
        if (appendToBuffer(data)) {
          iterate()
        } else {
          lineEvents.emit('line_finished')
        }
      }
    })
  }

  return {next: next}
}

module.exports = createLineIterator
