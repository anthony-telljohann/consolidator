import is from 'is'
import {
  SHOULD_BE_A_STRING,
  SHOULD_BE_DEFINED,
  SHOULD_NOT_BE_EMPTY
} from './messages/index'
import error from './lambdas/error'

export default class NonEmptyStringPropertyValidator {
  constructor(propertyName) {
    this.propertyName = propertyName
  }
  validate(value) {
    return new Promise((resolve, reject) => {
      if (!is.defined(value)) {
        reject(error(this.propertyName)(SHOULD_BE_DEFINED))
      }
      if (!is.string(value)) {
        reject(error(this.propertyName)(SHOULD_BE_A_STRING))
      }
      if (is.empty(value)) {
        reject(error(this.propertyName)(SHOULD_NOT_BE_EMPTY))
      }
      resolve(value)
    })
  }
}
