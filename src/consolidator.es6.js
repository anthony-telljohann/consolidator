import is from 'is'
import fs from 'async-file'
import path from 'path'
import glob from 'glob-promise'

async function concatenateDataToFile$1(sourceFileData, destinationFile) {
  if (!is.empty(sourceFileData.trim())) {
    if (!await fs.exists(destinationFile)) {
      let destinationFileDirectory = path.dirname(destinationFile)
      await fs.createDirectory(destinationFileDirectory)
    }
    return fs.appendFile(destinationFile, sourceFileData)
  }
}

async function concatenateFileToFile(sourceFile, destinationFile) {
  if (await fs.exists(sourceFile)) {
    return concatenateDataToFile$1(
      await fs.readTextFile(sourceFile),
      destinationFile
    )
  }
}

var concatenate = {
  dataToFile: concatenateDataToFile$1,
  fileToFile: concatenateFileToFile
}

async function consolidateFileToFile$1(sourceFile, destinationFile) {
  await fs.delete(destinationFile)
  await concatenate.fileToFile(sourceFile, destinationFile)
  return fs.delete(sourceFile)
}

async function consolidateFilesToFile$2(sourceFiles, destinationFile) {
  await fs.delete(destinationFile)
  if (!is.empty(sourceFiles)) {
    await Promise.all(
      sourceFiles.map(async sourceFile => {
        await concatenate.fileToFile(sourceFile, destinationFile)
        return fs.delete(sourceFile)
      })
    )
  }
}

async function consolidateGlobToFile$1(sourcesGlob, destinationFile) {
  return consolidateFilesToFile$2(await glob(sourcesGlob), destinationFile)
}

var consolidator$1 = {
  fileToFile: consolidateFileToFile$1,
  filesToFile: consolidateFilesToFile$2,
  globToFile: consolidateGlobToFile$1
}

class Validator {
  constructor(name) {
    this.name = name
  }
}

var ValidateString = Base =>
  class extends Base {
    isString(value) {
      if (!(is.string(value) && !is.empty(value.trim()))) {
        throw new TypeError(`${this.name} should be string`)
      }
    }
  }

class DestinationValidator extends ValidateString(Validator) {
  constructor() {
    super('destination')
  }
}

class SourceValidator extends ValidateString(Validator) {
  constructor() {
    super('source')
  }
}

var ValidateArray = Base =>
  class extends Base {
    isArray(value) {
      if (!is.array(value)) {
        throw new TypeError(`${this.name} should be an array`)
      }
    }
  }

class SourcesValidator extends ValidateString(ValidateArray(Validator)) {
  constructor() {
    super('sources')
  }
}

const destination = new DestinationValidator()
const source = new SourceValidator()
const sources = new SourcesValidator()

var validate = {
  destination,
  source,
  sources
}

var consolidator = {
  consolidate,
  consolidateGlobToFile,
  consolidateFilesToFile,
  consolidateFileToFile
}

async function consolidate(sources, destination) {
  return consolidateGlobToFile(sources, destination)
}

async function consolidateGlobToFile(sources, destination) {
  validate.sources.isString(sources)
  validate.destination.isString(destination)
  return consolidator$1.globToFile(sources, destination)
}

async function consolidateFilesToFile(sources, destination) {
  validate.sources.isArray(sources)
  validate.destination.isString(destination)
  return consolidator$1.filesToFile(sources, destination)
}

async function consolidateFileToFile(source, destination) {
  validate.source.isString(destination)
  validate.destination.isString(destination)
  return consolidator$1.fileToFile(source, destination)
}

export default consolidator
