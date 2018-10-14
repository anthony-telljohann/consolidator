import { consolidateFilesToFile } from 'consolidator'
import { SOURCE, SOURCES, DESTINATION } from 'constants'
import assert from 'unit/assertions'

describe(`consolidateFilesToFile`, () => {
  beforeEach(async function() {
    this.context = consolidateFilesToFile
  })
  assert.shouldBeAFunction()
  describe(`consolidating files to file`, () => {
    beforeEach(async function() {
      this.context = function() {
        return consolidateFilesToFile(this.sources, this.destination)
      }
    })
    describe(`with sources specified as an Array ([${SOURCE.FILES}])`, () => {
      beforeEach(async function() {
        this.sources = SOURCE.FILES
      })
      describe(`with destination specified as a String ("${
        DESTINATION.FILE
      }")`, () => {
        beforeEach(async function() {
          this.destination = DESTINATION.FILE
        })
        assert.shouldBeFulfilled()
      })
      describe(`without destination (undefined)`, () => {
        beforeEach(async function() {
          this.destination = undefined
        })
        assert.shouldBeRejected(DESTINATION.SHOULD_BE_A_NON_EMPTY_STRING)
      })
    })
    describe(`without sources (undefined)`, () => {
      beforeEach(async function() {
        this.sources = undefined
      })
      describe(`with destination specified as a String ("${
        DESTINATION.FILE
      }")`, () => {
        beforeEach(async function() {
          this.destination = DESTINATION.FILE
        })
        assert.shouldBeRejected(SOURCES.SHOULD_BE_AN_ARRAY)
      })
      describe(`without destination (undefined)`, () => {
        beforeEach(async function() {
          this.destination = undefined
        })
        assert.shouldBeRejected(SOURCES.SHOULD_BE_AN_ARRAY)
      })
    })
  })
})
