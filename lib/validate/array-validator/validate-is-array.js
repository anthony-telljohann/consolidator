import is from 'is'
import { SHOULD_BE_AN_ARRAY } from './message.js'

export default Base =>
  class extends Base {
    isArray(value) {
      if (!is.array(value)) {
        throw new TypeError(`${this.name} ${SHOULD_BE_AN_ARRAY}`)
      }
    }
  }
