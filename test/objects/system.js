import randomatic from 'randomatic'
import fs from 'async-file'
import path from 'path'
import glob from 'glob-promise'
import is from 'is'

import DESTINATION_DIRECTORY from '../constants/destination-directory'
import DESTINATION_FILE from '../constants/destination-file'
import RANDOM_SOURCE_FILES_TO_CREATE from '../constants/random-source-files-to-create'
import SOURCE_FILES from '../constants/source-files'
import SOURCES_DIRECTORY from '../constants/sources-directory'

import postConsolidatedFiles from '../variables/post-consolidated-files'
import preConsolidatedFiles from '../variables/pre-consolidated-files'

export default {
  async createEmptyDestinationFile() {
    return await createEmptyDestinationFile()
  },

  async createEmptySourceFiles() {
    return await createEmptySourceFiles()
  },

  async createRandomDestinationFile() {
    return await createRandomDestinationFile()
  },

  async createRandomSourceFiles() {
    return await createRandomSourceFiles()
  },

  async readPostConsolidatedDestinationFile() {
    return setPostConsolidatedDestinationFile(await readDestinationFile())
  },

  async readPostConsolidatedSourceFiles() {
    return setPostConsolidatedSourceFiles(await readSourceFiles())
  },

  async readPreConsolidatedDestinationFile() {
    return setPreConsolidatedDestinationFile(await readDestinationFile())
  },

  async readPreConsolidatedSourceFiles() {
    return setPreConsolidatedSourceFiles(await readSourceFiles())
  },

  async removeDestinationDirectory() {
    return await fs.delete(DESTINATION_DIRECTORY)
    // done()
  },

  async removeSourcesDirectory() {
    return await fs.delete(SOURCES_DIRECTORY)
    // done()
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

async function createEmptyFile(file) {
  if (!await fs.exists(file)) {
    await fs.createDirectory(path.dirname(file))
  }
  return await fs.writeTextFile(file, '')
}

async function createEmptyDestinationFile() {
  return await createEmptyFile(DESTINATION_FILE)
}

async function createEmptySourceFile() {
  return await createEmptyFile(SOURCES_DIRECTORY + randomatic('A', 10))
}

async function createEmptySourceFiles() {
  return await Promise.all(
    [...new Array(RANDOM_SOURCE_FILES_TO_CREATE)].map(() =>
      createEmptySourceFile()
    )
  )
}

async function createRandomFile(file) {
  if (!await fs.exists(file)) {
    await fs.createDirectory(path.dirname(file))
  }
  return await fs.writeTextFile(file, randomatic('*', 10))
}

async function createRandomDestinationFile() {
  return await createRandomFile(DESTINATION_FILE)
}

async function createRandomSourceFile() {
  return await createRandomFile(SOURCES_DIRECTORY + randomatic('A', 10))
}

async function createRandomSourceFiles() {
  return await Promise.all(
    [...new Array(RANDOM_SOURCE_FILES_TO_CREATE)].map(() =>
      createRandomSourceFile()
    )
  )
}

async function readSourceFiles() {
  let sourceFiles = await glob(SOURCE_FILES)
  let sourceFilesData
  if (!is.empty(sourceFiles)) {
    sourceFilesData = await Promise.all(
      sourceFiles.map(sourceFile => fs.readTextFile(sourceFile))
    )
  } else {
    sourceFilesData = null
  }
  return sourceFilesData
}

async function readDestinationFile() {
  let destinationFile
  try {
    destinationFile = await fs.readTextFile(DESTINATION_FILE)
  } catch (e) {
    destinationFile = null
  }
  return destinationFile
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
