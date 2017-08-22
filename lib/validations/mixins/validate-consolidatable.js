import is from 'is'

export default Base =>
  class extends Base {
    isConsolidatable (value) {
      if (!is.array(value) && !(is.string(value) && !is.empty(value.trim()))) {
        throw new TypeError(
          `${this.name} should be an array or a non-empty string`
        )
      }
    }
  }
