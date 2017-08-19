import * as fs from 'async-file'
import glob from 'glob-promise'
import is from 'is'
import path from 'path'
import { destinationValidator, sourcesValidator } from './validators/index.js'

export default {
  consolidate,
  consolidateGlobPatternToFile,
  consolidateFilesToFile,
  consolidateFileToFile
}

async function consolidate(sourceFilesGlobPattern, destinationFile) {
  await consolidateGlobPatternToFile(sourceFilesGlobPattern, destinationFile)
}

async function consolidateGlobPatternToFile(
  sourceFilesGlobPattern,
  destinationFile
) {
  await Promise.all([
    sourcesValidator.validate(sourceFilesGlobPattern),
    destinationValidator.validate(destinationFile)
  ])
  let sourceFiles = await glob(sourceFilesGlobPattern)
  await consolidateFilesToFile(sourceFiles, destinationFile)
}

async function consolidateFilesToFile(sourceFiles, destinationFile) {
  // nonEmptyArrayValidator.validate(sourcefiles)
  // nonEmptyStringValidator.validate(destinationFile)
  if (!is.empty(sourceFiles)) {
    await fs.delete(destinationFile)
    await Promise.all(
      sourceFiles.map(async sourceFile => {
        await appendFileToFile(sourceFile, destinationFile)
        await fs.delete(sourceFile)
      })
    )
  }
}

async function consolidateFileToFile(sourceFile, destinationFile) {
  // nonEmptyStringValidator.validate(sourceFile)
  // nonEmptyStringValidator.validate(destinationFile)
  await fs.delete(destinationFile)
  await appendFileToFile(sourceFile, destinationFile)
  await fs.delete(sourceFile)
}

// async function appendFilesToFile(sourceFiles, destinationFile) {
//   if (!is.empty(sourceFiles)) {
//     return await Promise.all(
//       sourceFiles.map(sourceFile =>
//         appendFileToFile(sourceFile, destinationFile)
//       )
//     )
//   }
// }

async function appendFileToFile(sourceFile, destinationFile) {
  let sourceFileExists = await fs.exists(sourceFile)
  if (sourceFileExists) {
    let sourceFileData = await fs.readTextFile(sourceFile)
    await appendDataToFile(sourceFileData, destinationFile)
  }
}

async function appendDataToFile(sourceFileData, destinationFile) {
  if (!is.empty(sourceFileData)) {
    let destinationFileExists = await fs.exists(destinationFile)
    if (!destinationFileExists) {
      await fs.createDirectory(path.dirname(destinationFile))
    }
    await fs.appendFile(destinationFile, sourceFileData)
  }
}
