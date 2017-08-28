import fs from 'async-file'
import path from 'path'
import { consolidateGlobToFile } from 'consolidator'
import randomatic from 'randomatic'
import consolidating from './consolidating.assertions.js'

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
  //set by something
  beforeEach(async function ()  {
    this.preConsolidated = {}
    this.preConsolidated.destinationFile = {}
    this.preConsolidated.sourceFiles = []
    this.postConsolidated = {}
    this.postConsolidated.destinationFile = {}
    this.postConsolidated.sourceFiles = []
  })

  //set by fixture
  beforeEach(async () => {
    await Promise.all([createDestinationDirectory(), createSourcesDirectory()])
    await createRandomSourceFiles()
  })
  //set by ??
  beforeEach(async function () {
    this.before = await Promise.all([
      fs.readTextFile('./sources/source1'),
      fs.readTextFile('./sources/source2'),
      fs.readTextFile('./sources/source3'),
    ])
  })

  beforeEach(async () => {
    await consolidateGlobToFile('./sources/*', './destination/consolidated')
  })


  // consolidating.shouldRemoveEverySourceFile()
  consolidating.shouldCreateDestinationFile()

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
