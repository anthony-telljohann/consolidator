import test from 'ava'

//  remove source files and destination file
test.afterEach(
  `source files have data and destination file has data`,
  async t => {
    return Promise.all([sourceFiles.delete(), destinationFile.delete()])
  }
)
