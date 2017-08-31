import { consolidateFilesToFile } from 'consolidator'
import assert from './assertions.js'
import File from './classes/file.js'
import Files from './classes/files.js'

const DESTINATION_FILE = './destination/consolidated.txt'
const SOURCES_DIRECTORY = './sources/'
const SOURCE_FILE_PATH_1 = SOURCES_DIRECTORY + '1.txt'
const SOURCE_FILE_PATH_2 = SOURCES_DIRECTORY + '2.txt'
const SOURCE_FILE_PATH_3 = SOURCES_DIRECTORY + '3.txt'
const SOURCE_FILE_PATHS = [
  SOURCE_FILE_PATH_1,
  SOURCE_FILE_PATH_2,
  SOURCE_FILE_PATH_3
]
const SOURCE_FILE_1 = new File(SOURCE_FILE_PATH_1)
const SOURCE_FILE_2 = new File(SOURCE_FILE_PATH_2)
const SOURCE_FILE_3 = new File(SOURCE_FILE_PATH_3)

function consolidate() {
  beforeEach(async function() {
    this.before = {}
    this.after = {}
    this.before.destinationFile = await this.destinationFile.read()
    this.before.sourceFiles = await this.sourceFiles.read()
    await consolidateFilesToFile(SOURCE_FILE_PATHS, DESTINATION_FILE)
    this.after.destinationFile = await this.destinationFile.read()
    this.after.sourceFiles = await this.sourceFiles.read()
  })
}

describe(`consolidating files to file`, () => {
  beforeEach(async function() {
    this.destinationFile = new File(DESTINATION_FILE)
    this.sourceFiles = new Files(SOURCE_FILE_1, SOURCE_FILE_2, SOURCE_FILE_3)
    await this.destinationFile.removeDirectory()
    await this.sourceFiles.removeDirectory()
  })
  describe('source files exist', () => {
    beforeEach(async function() {
      await this.sourceFiles.touch()
    })
    describe('source files contain data', () => {
      beforeEach(async function() {
        await this.sourceFiles.mock()
      })
      describe('destination directory exists', () => {
        beforeEach(async function() {
          await this.destinationFile.createDirectory()
        })
        describe('destination file exists', () => {
          beforeEach(async function() {
            await this.destinationFile.touch()
          })
          describe('destination file contains data', () => {
            beforeEach(async function() {
              await this.destinationFile.mock()
            })
            consolidate()
            assert.shouldConsolidate()
          })
          describe('destination file does not contain data', () => {
            consolidate()
            assert.shouldConsolidate()
          })
        })
        describe('destination file does not exist', () => {
          beforeEach(async function() {
            await this.destinationFile.remove()
          })
          consolidate()
          assert.shouldConsolidate()
        })
      })
      describe('destination directory does not exist', () => {
        beforeEach(async function() {
          await this.destinationFile.removeDirectory()
        })
        consolidate()
        assert.shouldConsolidate()
      })
    })
    describe('source files do not contain data', () => {
      describe('destination directory exists', () => {
        beforeEach(async function() {
          await this.destinationFile.createDirectory()
        })
        describe('destination file exists', () => {
          beforeEach(async function() {
            await this.destinationFile.touch()
          })
          describe('destination file contains data', () => {
            beforeEach(async function() {
              await this.destinationFile.mock()
            })
            consolidate()
            assert.shouldNotConsolidate()
          })
          describe('destination file does not contain data', () => {
            consolidate()
            assert.shouldNotConsolidate()
          })
        })
        describe('destination file does not exist', () => {
          beforeEach(async function() {
            await this.destinationFile.remove()
          })
          consolidate()
          assert.shouldNotConsolidate()
        })
      })
      describe('destination directory does not exist', () => {
        beforeEach(async function() {
          await this.destinationFile.removeDirectory()
        })
        consolidate()
        assert.shouldNotConsolidate()
      })
    })
  })
  describe('source files do not exist', () => {
    beforeEach(async function() {
      await this.sourceFiles.remove()
    })
    describe('destination directory exists', () => {
      beforeEach(async function() {
        await this.destinationFile.createDirectory()
      })
      describe('destination file exists', () => {
        beforeEach(async function() {
          await this.destinationFile.touch()
        })
        describe('destination file contains data', () => {
          beforeEach(async function() {
            await this.destinationFile.mock()
          })
          consolidate()
          assert.shouldNotConsolidate()
        })
        describe('destination file does not contain data', () => {
          consolidate()
          assert.shouldNotConsolidate()
        })
      })
      describe('destination file does not exist', () => {
        beforeEach(async function() {
          await this.destinationFile.remove()
        })
        consolidate()
        assert.shouldNotConsolidate()
      })
    })
    describe('destination directory does not exist', () => {
      beforeEach(async function() {
        await this.destinationFile.removeDirectory()
      })
      consolidate()
      assert.shouldNotConsolidate()
    })
  })
  afterEach(async function() {
    await this.destinationFile.removeDirectory()
    await this.sourceFiles.removeDirectory()
  })
})
