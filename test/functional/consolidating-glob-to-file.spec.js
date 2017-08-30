import fs from 'async-file'
import path from 'path'
import { consolidateGlobToFile } from 'consolidator'
import randomatic from 'randomatic'
import assert from './assertions.js'
import test from './fixtures/consolidating-fixture.js'

console.log(`test`, test)

describe(`consolidating glob to file`, () => {
  test.setup()

  beforeEach(async function() {
    await this.sourceFiles.map(sourceFile => sourceFile.mock())
  })
  test.consolidateGlobToFile()
  assert.shouldConsolidate()

  test.teardown()
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
