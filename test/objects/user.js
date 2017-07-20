import parameters from '../variables/parameters'

export default {
  specifySources(value) {
    parameters.sources = value
  },
  specifyDestination(value) {
    parameters.destination = value
  },
  unspecifySources() {
    parameters.sources = undefined
  },
  unspecifyDestination() {
    parameters.destination = undefined
  }
}
