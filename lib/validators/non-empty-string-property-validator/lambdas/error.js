import curry from 'lodash.curry'

export default curry(error)

function error(property, message) {
  return new TypeError(`${property} ${message}`)
}
