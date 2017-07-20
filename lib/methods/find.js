import glob from 'glob-promise'

export default find

function find(file) {
  return glob(file)
}
