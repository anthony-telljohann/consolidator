import { find } from './methods/index'
import { consolidateFilesToFile } from './lambdas/index'
import { destinationValidator, sourcesValidator } from './validators/index'

export default { consolidate }

function consolidate(sources, destination) {
  return Promise.all([
    sourcesValidator.validate(sources),
    destinationValidator.validate(destination)
  ])
    .then(() => find(sources))
    .then(consolidateFilesToFile(destination))
}
