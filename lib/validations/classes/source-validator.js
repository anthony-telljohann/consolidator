import Validator from './validator.js'
import ValidateString from '../mixins/validate-string.js'

export default class SourceValidator extends ValidateString(Validator) {
  constructor() {
    super('source')
  }
}
