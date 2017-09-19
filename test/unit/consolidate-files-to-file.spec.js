import { consolidateFilesToFile } from 'consolidator'
import { SOURCE, SOURCES, DESTINATION } from 'constants'
import assert from 'unit/assertions'

describe(`consolidateFilesToFile`, () => {
  beforeEach(async function() {
    this.context = consolidateFilesToFile
  })
  assert.shouldBeAFunction()
  describe(`not specifying sources and not specifying destination`, () => {
    beforeEach(async function() {
      this.context = consolidateFilesToFile()
    })
    assert.shouldBeRejected(SOURCES.SHOULD_BE_AN_ARRAY)
  })
  describe(`not specifying sources and specifying destination as "${DESTINATION.FILE}"`, () => {
    beforeEach(async function() {
      this.context = consolidateFilesToFile(undefined, DESTINATION.FILE)
    })
    assert.shouldBeRejected(SOURCES.SHOULD_BE_AN_ARRAY)
  })
  describe(`specifying sources as [${SOURCE.FILES}] and not specifying destination`, () => {
    beforeEach(async function() {
      this.context = consolidateFilesToFile(SOURCE.FILES, undefined)
    })
    assert.shouldBeRejected(DESTINATION.SHOULD_BE_NON_EMPTY_STRING)
  })
  describe(`specifying sources as [${SOURCE.FILES}] and specifying destination as "${DESTINATION.FILE}"`, () => {
    beforeEach(async function() {
      this.context = consolidateFilesToFile(SOURCE.FILES, DESTINATION.FILE)
    })
    assert.shouldBeFulfilled()
  })
})
