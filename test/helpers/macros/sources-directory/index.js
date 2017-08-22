import { SOURCES } from 'constants'
import fs from 'async-file'

export default {
  remove
}

async function remove () {
  return fs.delete(SOURCES.DIRECTORY)
}
remove.title = `remove sources directory`
