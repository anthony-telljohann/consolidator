import fs from 'fs-extra-promise'

export default create

function create(file) {
  return fs.createFileAsync(file)
}
