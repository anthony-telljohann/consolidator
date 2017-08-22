import Validator from './validator.js'
import ValidateArray from '../mixins/validate-array.js'
import ValidateConsolidatable from '../mixins/validate-consolidatable.js'
import ValidateString from '../mixins/validate-string.js'

export default class SourcesValidator extends ValidateConsolidatable(
  ValidateString(ValidateArray(Validator))
) {
  constructor () {
    super('sources')
  }
}
