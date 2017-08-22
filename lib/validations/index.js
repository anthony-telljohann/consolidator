import DestinationValidator from './classes/destination-validator.js'
import SourceValidator from './classes/source-validator.js'
import SourcesValidator from './classes/sources-validator.js'

const destination = new DestinationValidator()
const source = new SourceValidator()
const sources = new SourcesValidator()

export default {
  destination,
  source,
  sources
}
