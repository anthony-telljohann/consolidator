import is from 'is'
import glob from 'glob-promise'
import read from './read'

export default readAll

function readAll(pattern) {
  return glob(pattern).then(files => {
    if (!is.empty(files)) {
      return Promise.all(files.map(read))
    }
  })
}
