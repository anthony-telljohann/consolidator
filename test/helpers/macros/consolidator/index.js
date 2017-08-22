import * as consolidator from 'consolidator'
import { DESTINATION, SOURCE, SOURCES } from 'constants'

export default {
  consolidate,
  consolidateGlobToFile,
  consolidateFilesToFile,
  consolidateFileToFile
}

async function consolidate () {
  return consolidator.consolidate(SOURCES.GLOB, DESTINATION.FILE)
}
consolidate.title = (providedTitle, input, expected) =>
  `${providedTitle} consolidate ${SOURCES.GLOB} to ${DESTINATION.FILE}`.trim()

async function consolidateGlobToFile () {
  return consolidator.consolidateGlobToFile(SOURCES.GLOB, DESTINATION.FILE)
}
consolidateGlobToFile.title = (providedTitle, input, expected) =>
  `${providedTitle} consolidate ${SOURCES.GLOB} to ${DESTINATION.FILE}`.trim()

async function consolidateFilesToFile () {
  return consolidator.consolidateFilesToFile(SOURCE.FILES, DESTINATION.FILE)
}
consolidateFilesToFile.title = (providedTitle, input, expected) =>
  `${providedTitle} consolidate ${SOURCE.FILES.join(
    ' and '
  )} to ${DESTINATION.FILE}`.trim()

async function consolidateFileToFile () {
  return consolidator.consolidateFileToFile(SOURCE.FILE, DESTINATION.FILE)
}
consolidateFileToFile.title = (providedTitle, input, expected) =>
  `${providedTitle} consolidate ${SOURCE.FILE} to ${DESTINATION.FILE}`.trim()
