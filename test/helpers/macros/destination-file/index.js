import { DESTINATION } from 'constants'
import fs from 'async-file'

async function read () {
  let file = {}
  file.exists = await fs.exists(DESTINATION.FILE)
  if (file.exists) {
    file.data = await fs.readTextFile(DESTINATION.FILE)
  }
  return file
}

async function readAfter (t) {
  t.context.destinationFileAfter = await read()
}
readAfter.title = (providedTitle, input, expected) =>
  `${providedTitle} read destination file after consolidation`.trim()

async function readBefore (t) {
  t.context.destinationFileBefore = await read()
}
readBefore.title = (providedTitle, input, expected) =>
  `${providedTitle} read destination file before consolidation`.trim()

async function remove (t) {
  return fs.delete(DESTINATION.FILE)
}
remove.title = (providedTitle, input, expected) =>
  `${providedTitle} remove destination file`.trim()

async function touch (t) {
  return fs.writeTextFile(DESTINATION.FILE, '')
}
touch.title = (providedTitle, input, expected) =>
  `${providedTitle} touch empty destination file`.trim()

async function create (t) {
  return fs.writeTextFile(DESTINATION.FILE, randomatic('*', 100))
}
create.title = (providedTitle, input, expected) =>
  `${providedTitle} create destination file`.trim()

/// 

async function created (t) {
  console.log(
    `t.context.destinationFileBefore.exists`,
    t.context.destinationFileBefore.exists
  )
  console.log(
    `t.context.destinationFileAfter.exists`,
    t.context.destinationFileAfter.exists
  )
  t.true(true)
  // t.false(t.context.destinationFileBefore.exists)
  // t.true(t.context.destinationFileAfter.exists)
}
created.title = (providedTitle, input, expected) =>
  `${providedTitle} should create destination file`.trim()

async function removed (t) {
  t.true(t.context.destinationFileBefore.exists)
  t.false(t.context.destinationFileAfter.exists)
}
removed.title = (providedTitle, input, expected) =>
  `${providedTitle} should remove destination file`.trim()

async function replaced (t) {
  t.true(t.context.destinationFileBefore.exists)
  t.true(t.context.destinationFileAfter.exists)
}
replaced.title = (providedTitle, input, expected) =>
  `${providedTitle} should replace destination file`.trim()

// async function sourceFiles(t) {
//   let destinationFileData = ''
//   let sourceFilesData = []
//   if (await fs.exists(DESTINATION.FILE)) {
//     destinationFileData = await fs.readTextFile(DESTINATION.FILE)
//   }
//   sourceFilesData = await Promise.all(
//     SOURCE.FILES.map(async sourceFile => {
//       if (await fs.exists(sourceFile)) {
//         return fs.readTextFile(sourceFile)
//       }
//     })
//   )
//   console.log('destinationFileData', destinationFileData)
//   console.log('sourceFilesData', sourceFilesData)
//   t.true(
//     sourceFilesData.every(sourceFileData =>
//       destinationFileData.contains(sourceFileData)
//     )
//   )
// }
// sourceFiles.title = (providedTitle, input, expected) =>
//   `${providedTitle} destination file should contain every source file`.trim()

export default {
  read,
  remove,
  touch,
  create,
  created,
  removed,
  readAfter,
  readBefore
}
