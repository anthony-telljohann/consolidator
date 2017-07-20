import is from 'is'
import find from './find'
import read from './read'

export default readAll

function readAll(pattern) {
  return find(pattern).then(files => {
    if (!is.empty(files)) {
      return Promise.all(files.map(read))
    }
  })
}
