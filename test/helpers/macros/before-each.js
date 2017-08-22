import test from 'ava'

test.beforeEach(
  `source files do not exist and destination file does not exist`,
  async t => {
    return Promise.all([sourceFiles.delete(), destinationFile.delete()])
  }
)
// source files do not exist and destination file is empty
test.beforeEach(
  `source files do not exist and destination file is empty`,
  async t => {
    return Promise.all([sourceFiles.delete(), destinationFile.touch()])
  }
)
//  source files do not exist and given destination file has data
test.beforeEach(
  `source files do not exist and given destination file has data`,
  async t => {
    return Promise.all([sourceFiles.delete(), destinationFile.create()])
  }
)
//  source files are empty and destination file does not exist
test.beforeEach(
  `source files are empty and destination file does not exist`,
  async t => {
    return Promise.all([sourceFiles.touch(), destinationFile.delete()])
  }
)
//  source files are empty and destination file is empty
test.beforeEach(
  `source files are empty and destination file is empty`,
  async t => {
    return Promise.all([sourceFiles.touch(), destinationFile.touch()])
  }
)
//  source files are empty and destination file has data
test.beforeEach(
  `source files are empty and destination file has data`,
  async t => {
    return Promise.all([sourceFiles.touch(), destinationFile.create()])
  }
)
//  source files have data and destination file does not exist
test.beforeEach(
  `source files have data and destination file does not exist`,
  async t => {
    return Promise.all([sourceFiles.create(), destinationFile.delete()])
  }
)
//  source files have data and destination file is empty
test.beforeEach(
  `source files have data and destination file is empty`,
  async t => {
    return Promise.all([sourceFiles.create(), destinationFile.touch()])
  }
)
//  source files have data and destination file has data
test.beforeEach(
  `source files have data and destination file has data`,
  async t => {
    return Promise.all([sourceFiles.create(), destinationFile.create()])
  }
)
