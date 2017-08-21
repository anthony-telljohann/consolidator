import is from 'is'
import fs from 'async-file'
import path from 'path'

export default concatenateDataToFile

async function concatenateDataToFile(sourceFileData, destinationFile) {
  if (!is.empty(sourceFileData.trim())) {
    if (!await fs.exists(destinationFile)) {
      let destinationFileDirectory = path.dirname(destinationFile)
      await fs.createDirectory(destinationFileDirectory)
    }
    return fs.appendFile(destinationFile, sourceFileData)
  }
}
