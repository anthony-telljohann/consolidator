import find from './find'
import removeAll from './remove-all'

export default removeExisting

function removeExisting(files) {
  return find(files).then(removeAll)
}
