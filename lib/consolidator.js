import is from 'is'
import consolidator from './consolidations/index.js'
import validate from './validations/index.js'

export default {
  consolidate,
  consolidateGlobToFile,
  consolidateFilesToFile,
  consolidateFileToFile
}

async function consolidate (sources, destination) {
  return consolidateGlobToFile(sources, destination)
}

async function consolidateGlobToFile (sources, destination) {
  validate.sources.isString(sources)
  validate.destination.isString(destination)
  return consolidator.globToFile(sources, destination)
}

async function consolidateFilesToFile (sources, destination) {
  validate.sources.isArray(sources)
  validate.destination.isString(destination)
  return consolidator.filesToFile(sources, destination)
}

async function consolidateFileToFile (source, destination) {
  validate.source.isString(destination)
  validate.destination.isString(destination)
  return consolidator.fileToFile(source, destination)
}
