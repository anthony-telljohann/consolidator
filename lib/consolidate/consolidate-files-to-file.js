import fs from 'async-file'
import is from 'is'
import appendFileToFile from '../append/append-file-to-file.js'

export default consolidateFilesToFile

async function consolidateFilesToFile(sourceFiles, destinationFile) {
  await fs.delete(destinationFile)
  if (!is.empty(sourceFiles)) {
    await Promise.all(
      sourceFiles.map(async sourceFile => {
        await appendFileToFile(sourceFile, destinationFile)
        await fs.delete(sourceFile)
      })
    )
  }
}
