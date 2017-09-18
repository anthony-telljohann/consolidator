import IsArray from './validate-is-array.js'
import Validator from '../validator/index.js'

export default class StringValidator extends IsArray(Validator) {
  constructor(name) {
    super(name)
  }
}
