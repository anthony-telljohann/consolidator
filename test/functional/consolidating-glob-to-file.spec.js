import fs from 'async-file'
import path from 'path'
import { consolidateGlobToFile } from 'consolidator'
import randomatic from 'randomatic'
import assert from './assertions.js'

const DESTINATION_FILE = './destination/consolidated'
const SOURCE_FILES = [
  './sources/source1',
  './sources/source2',
  './sources/source3'
]

async function createDestinationDirectory () {
  await fs.createDirectory('./destination')
}

async function createSourcesDirectory () {
  return fs.createDirectory('./sources')
}

async function createRandomSourceFiles () {
  return Promise.all([
    fs.writeTextFile('./sources/source1', randomatic('*', 100)),
    fs.writeTextFile('./sources/source2', randomatic('*', 100)),
    fs.writeTextFile('./sources/source3', randomatic('*', 100))
  ])
}

async function removeDestinationDirectory () {
  return fs.delete('./destination')
}

async function removeSourcesDirectory () {
  return fs.delete('./sources')
}

describe(`consolidating glob to file`, () => {
  // context.reset()
  beforeEach(async function () {
    this.before = {}
    this.before.destinationFile = {}
    this.before.sourceFiles = []
    this.after = {}
    this.after.destinationFile = {}
    this.after.sourceFiles = []
    this.destinationFile = {}
    this.sourceFiles = []
  })

  // destination = new DestinationFactory(path)

  // beforeEach(destinationFile.reset())
  // beforeEach(sourceFiles.reset())

  // beforeEach(destinationFile.createDirectory(path))
  // beforeEach(destinationFile.create(path, data)
  // beforeEach(destinationFile.touch(path))

  // beforeEach(sourceFiles.create(path,))

  beforeEach(async function () {
    await Promise.all([createDestinationDirectory(), createSourcesDirectory()])
    await createRandomSourceFiles()
  })

  beforeEach(async function () {
    try {
      this.before.destinationFile.exists = await fs.exists(DESTINATION_FILE)
    } catch (e) {
      this.before.destinationFile.exists = false
    }
    try {
      this.before.destinationFile.data = await fs.readTextFile(DESTINATION_FILE)
    } catch (e) {
      this.before.destinationFile.data = null
    }
    this.before.sourceFiles = await Promise.all(
      SOURCE_FILES.map(async file => {
        let sourceFile = {}
        try {
          sourceFile.exists = await fs.exists(file)
        } catch (e) {
          sourceFile.exists = false
        }
        try {
          sourceFile.data = await fs.readTextFile(file)
        } catch (e) {
          sourceFile.data = null
        }
        return sourceFile
      })
    )
  })

  beforeEach(async function () {
    await consolidateGlobToFile('./sources/*', './destination/consolidated')
  })

  beforeEach(async function () {})

  beforeEach(async function () {
    try {
      this.after.destinationFile.exists = await fs.exists(DESTINATION_FILE)
    } catch (e) {
      this.after.destinationFile.exists = false
    }
    try {
      this.after.destinationFile.data = await fs.readTextFile(DESTINATION_FILE)
    } catch (e) {
      this.after.destinationFile.data = null
    }
    this.after.sourceFiles = await Promise.all(
      SOURCE_FILES.map(async file => {
        let sourceFile = {}
        try {
          sourceFile.exists = await fs.exists(file)
        } catch (e) {
          sourceFile.exists = false
        }
        try {
          sourceFile.data = await fs.readTextFile(file)
        } catch (e) {
          sourceFile.data = null
        }
        return sourceFile
      })
    )
  })

  assert.shouldConsolidate()

  afterEach(async () => {
    return Promise.all([removeDestinationDirectory(), removeSourcesDirectory()])
  })
})

// describe(`consolidating files`, () => {
//   describe('source files exist', () => {
//     describe('source files contain data', () => {
//       describe('destination directory exists', () => {
//         describe('destination file exists', () => {
//           describe('destination file contains data', () => {})
//           describe('destination file does not contain data', () => {})
//         })
//         describe('destination file does not exist', () => {})
//       })
//       describe('destination directory does not exist', () => {})
//     })
//     describe('source files do not contain data', () => {
//       describe('destination directory exists', () => {
//         describe('destination file exists', () => {
//           describe('destination file contains data', () => {})
//           describe('destination file does not contain data', () => {})
//         })
//         describe('destination file does not exist', () => {})
//       })
//       describe('destination directory does not exist', () => {})
//     })
//   })
//   describe('source files do not exist', () => {
//     describe('destination directory exists', () => {
//       describe('destination file exists', () => {
//         describe('destination file contains data', () => {})
//         describe('destination file does not contain data', () => {})
//       })
//       describe('destination file does not exist', () => {})
//     })
//     describe('destination directory does not exist', () => {})
//   })
// })

// describe(`consolidating file`, () => {
//   describe('source file exists', () => {
//     describe('source file contains data', () => {
//       describe('destination directory exists', () => {
//         describe('destination file exists', () => {
//           describe('destination file contains data', () => {})
//           describe('destination file does not contain data', () => {})
//         })
//         describe('destination file does not exist', () => {})
//       })
//       describe('destination directory does not exist', () => {})
//     })
//     describe('source file does not contain data', () => {
//       describe('destination directory exists', () => {
//         describe('destination file exists', () => {
//           describe('destination file contains data', () => {})
//           describe('destination file does not contain data', () => {})
//         })
//         describe('destination file does not exist', () => {})
//       })
//       describe('destination directory does not exist', () => {})
//     })
//   })
//   describe('source file does not exist', () => {
//     describe('destination directory exists', () => {
//       describe('destination file exists', () => {
//         describe('destination file contains data', () => {})
//         describe('destination file does not contain data', () => {})
//       })
//       describe('destination file does not exist', () => {})
//     })
//     describe('destination directory does not exist', () => {})
//   })
// })
