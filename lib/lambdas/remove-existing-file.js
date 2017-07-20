import is from 'is'
import removeExisting from '../methods/remove-existing'

export default outputFile => inputFiles => {
  if (!is.empty(inputFiles)) {
    return removeExisting(outputFile).then(() => inputFiles)
  }
}
