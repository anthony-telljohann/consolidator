import { consolidateFileToFile } from 'consolidator'
import assert from './assertions.js'
import File from '../classes/file.js'

const DESTINATION_FILE = './destination/consolidated.txt'
const SOURCE_FILE = './sources/source'

function consolidateFile() {
  beforeEach(async function() {
    this.before = {}
    this.after = {}
    this.before.destinationFile = await this.destinationFile.read()
    this.before.sourceFile = await this.sourceFile.read()
    await consolidateFileToFile(SOURCE_FILE, DESTINATION_FILE)
    this.after.destinationFile = await this.destinationFile.read()
    this.after.sourceFile = await this.sourceFile.read()
  })
}

describe(`consolidating file to file`, () => {
  beforeEach(async function() {
    this.destinationFile = new File(DESTINATION_FILE)
    this.sourceFile = new File(SOURCE_FILE)
    await this.destinationFile.removeDirectory()
    await this.sourceFile.removeDirectory()
  })
  describe('source files exist', () => {
    beforeEach(async function() {
      await this.sourceFile.touch()
    })
    describe('source files contain data', () => {
      beforeEach(async function() {
        await this.sourceFile.mock()
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
      await this.sourceFile.remove()
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
    await this.sourceFile.removeDirectory()
  })
})
