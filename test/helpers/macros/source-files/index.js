import { SOURCE } from 'constants'
import fs from 'async-file'
import path from 'path'
import randomatic from 'randomatic'

async function read () {
  return Promise.all(
    SOURCE.FILES.map(async sourceFile => {
      let file = {}
      file.exists = await fs.exists(sourceFile)
      if (file.exists) {
        file.data = await fs.readTextFile(sourceFile)
      }
      return file
    })
  )
}

async function readAfter (t) {
  t.context.sourceFilesAfter = await read()
}
readAfter.title = (providedTitle, input, expected) =>
  `${providedTitle} read source files after consolidation`.trim()

async function readBefore (t) {
  t.context.sourceFilesBefore = await read()
}
readBefore.title = (providedTitle, input, expected) =>
  `${providedTitle} read source files before consolidation`.trim()

async function touch (t) {
  return Promise.all(
    SOURCE.FILES.map(async sourceFile => {
      if (!await fs.exists(sourceFile)) {
        await fs.createDirectory(path.dirname(sourceFile))
      }
      return fs.writeTextFile(sourceFile, '')
    })
  )
}
touch.title = (providedTitle, input, expected) =>
  `${providedTitle} touch empty source files`.trim()

async function create (t) {
  return Promise.all(
    SOURCE.FILES.map(async sourceFile => {
      if (!await fs.exists(sourceFile)) {
        await fs.createDirectory(path.dirname(sourceFile))
      }
      return fs.writeTextFile(sourceFile, randomatic('*', 100))
    })
  )
}
create.title = (providedTitle, input, expected) =>
  `${providedTitle} create source files`.trim()

async function consolidated (t) {
  t.true(
    t.context.sourceFilesBefore.every(sourceFile => {
      return t.context.destinationFileAfter.data.contains(sourceFile.data)
    })
  )
}
consolidated.title = (providedTitle, input, expected) =>
  `${providedTitle} source files consolidated to destination file`.trim()

export default {
  readAfter,
  readBefore,
  touch,
  create,
  consolidated
}
