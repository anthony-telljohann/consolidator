import appendDataToFile from './append-data-to-file'
import read from '../methods/read'
import removeExisting from '../methods/remove-existing'

export default outputFile => inputFile =>
  read(inputFile)
    .then(appendDataToFile(outputFile))
    .then(removeExisting(inputFile))
