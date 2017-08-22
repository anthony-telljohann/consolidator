import fs from 'async-file'
import concatenateDataToFile from './concatenate-data-to-file.js'

export default concatenateFileToFile

async function concatenateFileToFile (sourceFile, destinationFile) {
  if (await fs.exists(sourceFile)) {
    return concatenateDataToFile(
      await fs.readTextFile(sourceFile),
      destinationFile
    )
  }
}
