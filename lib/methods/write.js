import fs from 'fs-extra-promise'
import create from './create'

export default write

function write(file, data) {
  return create(file).then(writeFile)

  function writeFile() {
    return fs.writeFileAsync(file, data)
  }
}
