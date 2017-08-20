import fs from 'async-file'
import appendFileToFile from '../append/append-file-to-file.js'

export default consolidateFileToFile

async function consolidateFileToFile(sourceFile, destinationFile) {
  await fs.delete(destinationFile)
  await appendFileToFile(sourceFile, destinationFile)
  await fs.delete(sourceFile)
}
