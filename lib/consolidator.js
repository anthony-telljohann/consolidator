import is from 'is'
import consolidator from './consolidate/index.js'

export default {
  consolidate,
  consolidateGlobToFile,
  consolidateFilesToFile,
  consolidateFileToFile
}

const validate = {
  isString: (name, value) => {
    if (!is.string(value) || is.empty(value.trim())) {
      throw new TypeError(`${name} should be string`.trim())
    }
  },
  isArray: (name, value) => {
    if (!is.array(value)) {
      throw new TypeError(`${name} should be an array`.trim())
    }
  }
}

async function consolidate(sources, destination) {
  await consolidateGlobToFile(sources, destination)
}

async function consolidateGlobToFile(sources, destination) {
  validate.isString('sources', sources)
  validate.isString('destination', destination)
  await consolidator.globToFile(sources, destination)
}

async function consolidateFilesToFile(sources, destination) {
  validate.isArray('sources', sources)
  validate.isString('destination', destination)
  await consolidator.filesToFile(sources, destination)
}

async function consolidateFileToFile(source, destination) {
  validate.isString('source', source)
  validate.isString('destination', destination)
  await consolidator.fileToFile(source, destination)
}
