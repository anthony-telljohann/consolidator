import is from 'is'
import consolidateFileToFile from './consolidate-file-to-file'
import removeExisting from '../methods/remove-existing'

export default outputFile => inputFiles => {
  if (!is.empty(inputFiles) && !is.empty(inputFiles.join(''))) {
    return removeExisting(outputFile).then(() =>
      Promise.all(inputFiles.map(consolidateFileToFile(outputFile)))
    )
  }
}
