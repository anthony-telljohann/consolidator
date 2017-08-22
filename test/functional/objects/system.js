import randomatic from 'randomatic'

import read from '../methods/read.js'
import readAll from '../methods/read-all.js'
import remove from '../methods/remove.js'
import write from '../methods/write.js'

import DESTINATION_DIRECTORY from '../constants/destination-directory'
import DESTINATION_FILE from '../constants/destination-file'
import RANDOM_SOURCE_FILES_TO_CREATE from '../constants/random-source-files-to-create'
import SOURCE_FILES from '../constants/source-files'
import SOURCES_DIRECTORY from '../constants/sources-directory'

import postConsolidatedFiles from '../variables/post-consolidated-files'
import preConsolidatedFiles from '../variables/pre-consolidated-files'

export default {
  createEmptyDestinationFile(done) {
    createEmptyDestinationFile().then(function() {
      done()
    })
  },
  createEmptySourceFiles(done) {
    createEmptySourceFiles().then(function() {
      done()
    })
  },
  createRandomDestinationFile(done) {
    createRandomDestinationFile().then(function() {
      done()
    })
  },
  createRandomSourceFiles(done) {
    createRandomSourceFiles().then(function() {
      done()
    })
  },
  readPostConsolidatedDestinationFile(done) {
    readDestinationFile()
      .then(setPostConsolidatedDestinationFile)
      .then(function() {
        done()
      })
  },
  readPostConsolidatedSourceFiles(done) {
    readSourceFiles().then(setPostConsolidatedSourceFiles).then(function() {
      done()
    })
  },
  readPreConsolidatedDestinationFile(done) {
    readDestinationFile()
      .then(setPreConsolidatedDestinationFile)
      .then(function() {
        done()
      })
  },
  readPreConsolidatedSourceFiles(done) {
    readSourceFiles().then(setPreConsolidatedSourceFiles).then(function() {
      done()
    })
  },
  removeDestinationDirectory(done) {
    remove(DESTINATION_DIRECTORY).then(function() {
      done()
    })
  },
  removeSourcesDirectory(done) {
    remove(SOURCES_DIRECTORY).then(function() {
      done()
    })
  },
  unsetPostConsolidatedDestinationFile() {
    setPostConsolidatedDestinationFile(undefined)
  },

  unsetPostConsolidatedSourceFiles() {
    setPostConsolidatedSourceFiles(undefined)
  },

  unsetPreConsolidatedDestinationFile() {
    setPreConsolidatedDestinationFile(undefined)
  },

  unsetPreConsolidatedSourceFiles() {
    setPreConsolidatedSourceFiles(undefined)
  }
}

function createEmptyFile(file) {
  let data = ''
  return write(file, data)
}

function createEmptyDestinationFile() {
  return createEmptyFile(DESTINATION_FILE)
}

function createEmptySourceFile() {
  return createEmptyFile(SOURCES_DIRECTORY + randomatic('A', 10))
}

function createEmptySourceFiles() {
  return Promise.all(
    [...new Array(RANDOM_SOURCE_FILES_TO_CREATE)].map(() =>
      createEmptySourceFile()
    )
  )
}

function createRandomFile(file) {
  let data = randomatic('*', 10)
  return write(file, data)
}

function createRandomDestinationFile() {
  return createRandomFile(DESTINATION_FILE)
}

function createRandomSourceFile() {
  return createRandomFile(SOURCES_DIRECTORY + randomatic('A', 10))
}

function createRandomSourceFiles() {
  return Promise.all(
    [...new Array(RANDOM_SOURCE_FILES_TO_CREATE)].map(() =>
      createRandomSourceFile()
    )
  )
}

function readSourceFiles() {
  return readAll(SOURCE_FILES).catch(() => null)
}
function readDestinationFile() {
  return read(DESTINATION_FILE).catch(() => null)
}

function setPostConsolidatedDestinationFile(value) {
  postConsolidatedFiles.destination = value
}

function setPostConsolidatedSourceFiles(value) {
  postConsolidatedFiles.sources = value
}

function setPreConsolidatedDestinationFile(value) {
  preConsolidatedFiles.destination = value
}

function setPreConsolidatedSourceFiles(value) {
  preConsolidatedFiles.sources = value
}
