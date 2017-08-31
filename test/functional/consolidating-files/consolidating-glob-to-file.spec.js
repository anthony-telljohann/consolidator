import { consolidate } from 'consolidator'
import assert from './assertions.js'
import File from './classes/file.js'
import RandomFiles from './classes/random-files.js'

const DESTINATION_FILE = './destination/consolidated.txt'
const SOURCES_DIRECTORY = './sources/'
const SOURCES_GLOB = `${SOURCES_DIRECTORY}*`

function consolidateFiles() {
  beforeEach(async function() {
    this.before = {}
    this.after = {}
    this.before.destinationFile = await this.destinationFile.read()
    this.before.sourceFiles = await this.sourceFiles.read()
    await consolidateGlobToFile(SOURCES_GLOB, DESTINATION_FILE)
    this.after.destinationFile = await this.destinationFile.read()
    this.after.sourceFiles = await this.sourceFiles.read()
  })
}

describe(`consolidating glob to file`, () => {
  beforeEach(async function() {
    this.destinationFile = new File(DESTINATION_FILE)
    this.sourceFiles = new RandomFiles(SOURCES_DIRECTORY, 10)
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
