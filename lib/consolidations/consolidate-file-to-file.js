import fs from 'async-file'
import concatenate from '../concatenations/index.js'

export default consolidateFileToFile

async function consolidateFileToFile(sourceFile, destinationFile) {
  await fs.delete(destinationFile)
  await concatenate.fileToFile(sourceFile, destinationFile)
  return fs.delete(sourceFile)
}
