import { consolidateFileToFile } from 'consolidator'
import { SOURCE, DESTINATION } from 'constants'
import assert from './assertions.js'

const SOURCE_SHOULD_BE_NON_EMPTY_STRING = `source should be a non-empty string`
const DESTINATION_SHOULD_BE_NON_EMPTY_STRING = `destination should be a non-empty string`

describe(`consolidateFileToFile`, () => {
  beforeEach(async function() {
    this.context = consolidateFileToFile
  })
  assert.shouldBeAFunction()
  describe(`not specifying source and not specifying destination`, () => {
    beforeEach(async function() {
      this.context = consolidateFileToFile()
    })
    assert.shouldBeRejected(SOURCE_SHOULD_BE_NON_EMPTY_STRING)
  })
  describe(`not specifying source and specifying destination as "${DESTINATION.FILE}"`, () => {
    beforeEach(async function() {
      this.context = consolidateFileToFile(undefined, DESTINATION.FILE)
    })
    assert.shouldBeRejected(SOURCE_SHOULD_BE_NON_EMPTY_STRING)
  })
  describe(`specifying source as "${SOURCE.FILE}" and not specifying destination`, () => {
    beforeEach(async function() {
      this.context = consolidateFileToFile(SOURCE.FILE, undefined)
    })
    assert.shouldBeRejected(DESTINATION_SHOULD_BE_NON_EMPTY_STRING)
  })
  describe(`specifying source as "${SOURCE.FILE}" and specifying destination as "${DESTINATION.FILE}"`, () => {
    beforeEach(async function() {
      this.context = consolidateFileToFile(SOURCE.FILE, DESTINATION.FILE)
    })
    assert.shouldBeFulfilled()
  })
})
