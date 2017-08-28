import IsString from './validate-is-string.js'
import Validator from '../validator/index.js'

export default class StringValidator extends IsString(Validator) {
  constructor (name) {
    super(name)
  }
}
