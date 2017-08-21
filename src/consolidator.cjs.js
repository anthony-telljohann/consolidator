'use strict'

function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex
}

var is = _interopDefault(require('is'))
var fs = _interopDefault(require('async-file'))
var path = _interopDefault(require('path'))
var glob = _interopDefault(require('glob-promise'))

var asyncToGenerator = function(fn) {
  return function() {
    var gen = fn.apply(this, arguments)
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg)
          var value = info.value
        } catch (error) {
          reject(error)
          return
        }

        if (info.done) {
          resolve(value)
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value)
            },
            function(err) {
              step('throw', err)
            }
          )
        }
      }

      return step('next')
    })
  }
}

var classCallCheck = function(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

var createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true
      Object.defineProperty(target, descriptor.key, descriptor)
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps)
    if (staticProps) defineProperties(Constructor, staticProps)
    return Constructor
  }
})()

var inherits = function(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    )
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  })
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass)
}

var possibleConstructorReturn = function(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    )
  }

  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self
}

var concatenateDataToFile = (function() {
  var _ref = asyncToGenerator(
    regeneratorRuntime.mark(function _callee(sourceFileData, destinationFile) {
      var destinationFileDirectory
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                if (is.empty(sourceFileData.trim())) {
                  _context.next = 8
                  break
                }

                _context.next = 3
                return fs.exists(destinationFile)

              case 3:
                if (_context.sent) {
                  _context.next = 7
                  break
                }

                destinationFileDirectory = path.dirname(destinationFile)
                _context.next = 7
                return fs.createDirectory(destinationFileDirectory)

              case 7:
                return _context.abrupt(
                  'return',
                  fs.appendFile(destinationFile, sourceFileData)
                )

              case 8:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        this
      )
    })
  )

  return function concatenateDataToFile(_x, _x2) {
    return _ref.apply(this, arguments)
  }
})()

var concatenateFileToFile = (function() {
  var _ref = asyncToGenerator(
    regeneratorRuntime.mark(function _callee(sourceFile, destinationFile) {
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2
                return fs.exists(sourceFile)

              case 2:
                if (!_context.sent) {
                  _context.next = 9
                  break
                }

                _context.t0 = concatenateDataToFile
                _context.next = 6
                return fs.readTextFile(sourceFile)

              case 6:
                _context.t1 = _context.sent
                _context.t2 = destinationFile
                return _context.abrupt(
                  'return',
                  (0, _context.t0)(_context.t1, _context.t2)
                )

              case 9:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        this
      )
    })
  )

  return function concatenateFileToFile(_x, _x2) {
    return _ref.apply(this, arguments)
  }
})()

var concatenate = {
  dataToFile: concatenateDataToFile,
  fileToFile: concatenateFileToFile
}

var consolidateFileToFile$1 = (function() {
  var _ref = asyncToGenerator(
    regeneratorRuntime.mark(function _callee(sourceFile, destinationFile) {
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2
                return fs.delete(destinationFile)

              case 2:
                _context.next = 4
                return concatenate.fileToFile(sourceFile, destinationFile)

              case 4:
                return _context.abrupt('return', fs.delete(sourceFile))

              case 5:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        this
      )
    })
  )

  return function consolidateFileToFile(_x, _x2) {
    return _ref.apply(this, arguments)
  }
})()

var consolidateFilesToFile$1 = (function() {
  var _ref = asyncToGenerator(
    regeneratorRuntime.mark(function _callee2(sourceFiles, destinationFile) {
      var _this = this

      return regeneratorRuntime.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.next = 2
                return fs.delete(destinationFile)

              case 2:
                sourceFiles = sourceFiles.filter(is.string)

                if (is.empty(sourceFiles)) {
                  _context2.next = 6
                  break
                }

                _context2.next = 6
                return Promise.all(
                  sourceFiles.map(
                    (function() {
                      var _ref2 = asyncToGenerator(
                        regeneratorRuntime.mark(function _callee(sourceFile) {
                          return regeneratorRuntime.wrap(
                            function _callee$(_context) {
                              while (1) {
                                switch ((_context.prev = _context.next)) {
                                  case 0:
                                    _context.next = 2
                                    return concatenate.fileToFile(
                                      sourceFile,
                                      destinationFile
                                    )

                                  case 2:
                                    return _context.abrupt(
                                      'return',
                                      fs.delete(sourceFile)
                                    )

                                  case 3:
                                  case 'end':
                                    return _context.stop()
                                }
                              }
                            },
                            _callee,
                            _this
                          )
                        })
                      )

                      return function(_x3) {
                        return _ref2.apply(this, arguments)
                      }
                    })()
                  )
                )

              case 6:
              case 'end':
                return _context2.stop()
            }
          }
        },
        _callee2,
        this
      )
    })
  )

  return function consolidateFilesToFile(_x, _x2) {
    return _ref.apply(this, arguments)
  }
})()

var consolidateGlobToFile$1 = (function() {
  var _ref = asyncToGenerator(
    regeneratorRuntime.mark(function _callee(sourcesGlob, destinationFile) {
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.t0 = consolidateFilesToFile$1
                _context.next = 3
                return glob(sourcesGlob)

              case 3:
                _context.t1 = _context.sent
                _context.t2 = destinationFile
                return _context.abrupt(
                  'return',
                  (0, _context.t0)(_context.t1, _context.t2)
                )

              case 6:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        this
      )
    })
  )

  return function consolidateGlobToFile(_x, _x2) {
    return _ref.apply(this, arguments)
  }
})()

var _consolidate = {
  fileToFile: consolidateFileToFile$1,
  filesToFile: consolidateFilesToFile$1,
  globToFile: consolidateGlobToFile$1
}

var Validator = function Validator(name) {
  classCallCheck(this, Validator)

  this.name = name
}

var ValidateString = function(Base) {
  return (function(_Base) {
    inherits(_class, _Base)

    function _class() {
      classCallCheck(this, _class)
      return possibleConstructorReturn(
        this,
        (_class.__proto__ || Object.getPrototypeOf(_class))
          .apply(this, arguments)
      )
    }

    createClass(_class, [
      {
        key: 'isString',
        value: function isString(value) {
          if (!(is.string(value) && !is.empty(value.trim()))) {
            throw new TypeError(`${this.name} should be a non-empty string`)
          }
        }
      }
    ])
    return _class
  })(Base)
}

var DestinationValidator = (function(_ValidateString) {
  inherits(DestinationValidator, _ValidateString)

  function DestinationValidator() {
    classCallCheck(this, DestinationValidator)
    return possibleConstructorReturn(
      this,
      (DestinationValidator.__proto__ ||
        Object.getPrototypeOf(DestinationValidator))
        .call(this, 'destination')
    )
  }

  return DestinationValidator
})(ValidateString(Validator))

var SourceValidator = (function(_ValidateString) {
  inherits(SourceValidator, _ValidateString)

  function SourceValidator() {
    classCallCheck(this, SourceValidator)
    return possibleConstructorReturn(
      this,
      (SourceValidator.__proto__ || Object.getPrototypeOf(SourceValidator))
        .call(this, 'source')
    )
  }

  return SourceValidator
})(ValidateString(Validator))

var ValidateArray = function(Base) {
  return (function(_Base) {
    inherits(_class, _Base)

    function _class() {
      classCallCheck(this, _class)
      return possibleConstructorReturn(
        this,
        (_class.__proto__ || Object.getPrototypeOf(_class))
          .apply(this, arguments)
      )
    }

    createClass(_class, [
      {
        key: 'isArray',
        value: function isArray(value) {
          if (!is.array(value)) {
            throw new TypeError(`${this.name} should be an array`)
          }
        }
      }
    ])
    return _class
  })(Base)
}

var ValidateConsolidatable = function(Base) {
  return (function(_Base) {
    inherits(_class, _Base)

    function _class() {
      classCallCheck(this, _class)
      return possibleConstructorReturn(
        this,
        (_class.__proto__ || Object.getPrototypeOf(_class))
          .apply(this, arguments)
      )
    }

    createClass(_class, [
      {
        key: 'isConsolidatable',
        value: function isConsolidatable(value) {
          if (
            !is.array(value) &&
            !(is.string(value) && !is.empty(value.trim()))
          ) {
            throw new TypeError(
              `${this.name} should be an array or a non-empty string`
            )
          }
        }
      }
    ])
    return _class
  })(Base)
}

var SourcesValidator = (function(_ValidateConsolidatab) {
  inherits(SourcesValidator, _ValidateConsolidatab)

  function SourcesValidator() {
    classCallCheck(this, SourcesValidator)
    return possibleConstructorReturn(
      this,
      (SourcesValidator.__proto__ || Object.getPrototypeOf(SourcesValidator))
        .call(this, 'sources')
    )
  }

  return SourcesValidator
})(ValidateConsolidatable(ValidateString(ValidateArray(Validator))))

var destination = new DestinationValidator()
var source = new SourceValidator()
var sources = new SourcesValidator()

var _validate = {
  destination,
  source,
  sources
}

var consolidate = (function() {
  var _ref = asyncToGenerator(
    regeneratorRuntime.mark(function _callee(sources, destination) {
      var consolidate
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _validate.sources.isConsolidatable(sources)
                _validate.destination.isString(destination)
                consolidate = void 0

                if (is.string(sources)) {
                  consolidate = _consolidate.globToFile(sources, destination)
                } else {
                  consolidate = _consolidate.filesToFile(sources, destination)
                }
                return _context.abrupt('return', consolidate)

              case 5:
              case 'end':
                return _context.stop()
            }
          }
        },
        _callee,
        this
      )
    })
  )

  return function consolidate(_x, _x2) {
    return _ref.apply(this, arguments)
  }
})()

var consolidateGlobToFile = (function() {
  var _ref2 = asyncToGenerator(
    regeneratorRuntime.mark(function _callee2(sources, destination) {
      return regeneratorRuntime.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _validate.sources.isString(sources)
                _validate.destination.isString(destination)
                return _context2.abrupt(
                  'return',
                  _consolidate.globToFile(sources, destination)
                )

              case 3:
              case 'end':
                return _context2.stop()
            }
          }
        },
        _callee2,
        this
      )
    })
  )

  return function consolidateGlobToFile(_x3, _x4) {
    return _ref2.apply(this, arguments)
  }
})()

var consolidateFilesToFile = (function() {
  var _ref3 = asyncToGenerator(
    regeneratorRuntime.mark(function _callee3(sources, destination) {
      return regeneratorRuntime.wrap(
        function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                _validate.sources.isArray(sources)
                _validate.destination.isString(destination)
                return _context3.abrupt(
                  'return',
                  _consolidate.filesToFile(sources, destination)
                )

              case 3:
              case 'end':
                return _context3.stop()
            }
          }
        },
        _callee3,
        this
      )
    })
  )

  return function consolidateFilesToFile(_x5, _x6) {
    return _ref3.apply(this, arguments)
  }
})()

var consolidateFileToFile = (function() {
  var _ref4 = asyncToGenerator(
    regeneratorRuntime.mark(function _callee4(source, destination) {
      return regeneratorRuntime.wrap(
        function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                _validate.source.isString(source)
                _validate.destination.isString(destination)
                return _context4.abrupt(
                  'return',
                  _consolidate.fileToFile(source, destination)
                )

              case 3:
              case 'end':
                return _context4.stop()
            }
          }
        },
        _callee4,
        this
      )
    })
  )

  return function consolidateFileToFile(_x7, _x8) {
    return _ref4.apply(this, arguments)
  }
})()

var consolidator = {
  consolidate,
  consolidateGlobToFile,
  consolidateFilesToFile,
  consolidateFileToFile
}

module.exports = consolidator
