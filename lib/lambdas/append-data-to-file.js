import fs from 'fs-extra-promise'
import is from 'is'
import create from '../methods/create'

export default outputFile => inputData => {
  if (!is.empty(inputData) && is.string(inputData)) {
    return create(outputFile).then(() =>
      fs.appendFileAsync(outputFile, inputData)
    )
  }
}
