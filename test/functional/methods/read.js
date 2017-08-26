// import is from 'is'
import fs from 'fs-extra-promise'

export default read

const UTF8_FILE_TYPE = 'utf8'

function read (file) {
  // if (!is.empty(file)) {
  return fs.readFileAsync(file, UTF8_FILE_TYPE)
  // }
}
