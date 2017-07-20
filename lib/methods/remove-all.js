import is from 'is'
import remove from './remove'

export default removeAll

function removeAll(files) {
  if (!is.empty(files)) {
    return Promise.all(files.map(remove))
  }
}
