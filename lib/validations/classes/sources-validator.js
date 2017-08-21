import Validator from './validator.js'
import ValidateArray from '../mixins/validate-array.js'
import ValidateString from '../mixins/validate-string.js'

export default class SourcesValidator extends ValidateString(
  ValidateArray(Validator)
) {
  constructor () {
    super('sources')
  }
}
