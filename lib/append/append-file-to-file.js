import fs from 'async-file'
import appendDataToFile from './append-data-to-file.js'

export default appendFileToFile

async function appendFileToFile(sourceFile, destinationFile) {
  if (await fs.exists(sourceFile)) {
    await appendDataToFile(await fs.readTextFile(sourceFile), destinationFile)
  }
}
