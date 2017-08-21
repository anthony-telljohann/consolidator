import Validator from './validator.js'
import ValidateString from '../mixins/validate-string.js'

export default class DestinationValidator extends ValidateString(Validator) {
  constructor () {
    super('destination')
  }
}
