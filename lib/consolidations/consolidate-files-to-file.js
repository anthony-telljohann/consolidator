import fs from 'async-file'
import is from 'is'
import concatenate from '../concatenations/index.js'

export default consolidateFilesToFile

async function consolidateFilesToFile(sourceFiles, destinationFile) {
  await fs.delete(destinationFile)
  if (!is.empty(sourceFiles)) {
    await Promise.all(
      sourceFiles.map(async sourceFile => {
        await concatenate.fileToFile(sourceFile, destinationFile)
        return fs.delete(sourceFile)
      })
    )
  }
}
