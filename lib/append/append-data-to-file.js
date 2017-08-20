import is from 'is'
import fs from 'async-file'
import path from 'path'

export default appendDataToFile

async function appendDataToFile(sourceFileData, destinationFile) {
  if (!is.empty(sourceFileData.trim())) {
    if (!await fs.exists(destinationFile)) {
      let destinationFileDirectory = path.dirname(destinationFile)
      await fs.createDirectory(destinationFileDirectory)
    }
    await fs.appendFile(destinationFile, sourceFileData)
  }
}
