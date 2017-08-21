import is from 'is'

export default Base =>
  class extends Base {
    isArray (value) {
      if (!is.array(value)) {
        throw new TypeError(`${this.name} should be an array`)
      }
    }
  }
