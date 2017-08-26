import fs from 'fs-extra-promise'

export default remove

function remove (file) {
  return fs.removeAsync(file)
}
