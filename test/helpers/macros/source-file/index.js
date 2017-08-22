import { SOURCE } from 'constants'
import fs from 'async-file'
import randomatic from 'randomatic'

export default {
  read,
  touch,
  create
}

async function read (t) {
  t.context.sourceFile = {}
  t.context.sourceFile.exists = await fs.exists(SOURCE.FILE)
  if (t.context.sourceFile.exists) {
    t.context.sourceFile.data = await fs.readTextFile(SOURCE.FILE)
  }
}
read.title = `read source file`

async function touch (t) {
  return fs.writeTextFile(SOURCE.FILE, '')
}
touch.title = `touch empty source file`

async function create (t) {
  return fs.writeTextFile(SOURCE.FILE, randomatic('*', 100))
}
create.title = `create source file`

// test.beforeEach(macros.destinationFile.delete)
// test.beforeEach(macros.destinationFile.touch)
// test.beforeEach(macros.destinationFile.create)
