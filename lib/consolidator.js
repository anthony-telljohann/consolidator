import is from 'is'
import _consolidate from './consolidations/index.js'
import _validate from './validations/index.js'

export {
  consolidate,
  consolidateGlobToFile,
  consolidateFilesToFile,
  consolidateFileToFile
}

async function consolidate (sources, destination) {
  _validate.sources.isConsolidatable(sources)
  _validate.destination.isString(destination)
  let consolidate
  if (is.string(sources)) {
    consolidate = _consolidate.globToFile(sources, destination)
  } else {
    consolidate = _consolidate.filesToFile(sources, destination)
  }
  return consolidate
}

async function consolidateGlobToFile (sources, destination) {
  _validate.sources.isString(sources)
  _validate.destination.isString(destination)
  return _consolidate.globToFile(sources, destination)
}

async function consolidateFilesToFile (sources, destination) {
  _validate.sources.isArray(sources)
  _validate.destination.isString(destination)
  return _consolidate.filesToFile(sources, destination)
}

async function consolidateFileToFile (source, destination) {
  _validate.source.isString(source)
  _validate.destination.isString(destination)
  return _consolidate.fileToFile(source, destination)
}
