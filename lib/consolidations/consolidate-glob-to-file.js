import glob from 'glob-promise'
import consolidateFilesToFile from './consolidate-files-to-file.js'

export default consolidateGlobToFile

async function consolidateGlobToFile (sourcesGlob, destinationFile) {
  return consolidateFilesToFile(await glob(sourcesGlob), destinationFile)
}
