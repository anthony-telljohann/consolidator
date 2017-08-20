import glob from 'glob-promise'
import consolidateFilesToFile from './consolidate-files-to-file.js'

export default consolidateGlobToFile

async function consolidateGlobToFile(sourcesGlob, destinationFile) {
  await consolidateFilesToFile(await glob(sourcesGlob), destinationFile)
}
