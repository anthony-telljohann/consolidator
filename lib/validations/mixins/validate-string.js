import is from 'is'

export default Base =>
  class extends Base {
    isString (value) {
      if (!(is.string(value) && !is.empty(value.trim()))) {
        throw new TypeError(`${this.name} should be string`)
      }
    }
  }
