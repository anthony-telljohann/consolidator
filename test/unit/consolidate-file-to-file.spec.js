import { consolidateFileToFile } from 'consolidator'
import { SOURCE, DESTINATION } from 'constants'
import assert from 'unit/assertions'

describe(`consolidateFileToFile`, () => {
  beforeEach(async function() {
    this.context = consolidateFileToFile
  })
  assert.shouldBeAFunction()
  describe(`consolidating file to file`, () => {
    beforeEach(async function() {
      this.context = function() {
        return consolidateFileToFile(this.source, this.destination)
      }
    })
    describe(`with source specified as a String ("${SOURCE.FILE}")`, () => {
      beforeEach(async function() {
        this.source = SOURCE.FILE
      })
      describe(`with destination specified as a String ("${DESTINATION.FILE}")`, () => {
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
    describe(`without source (undefined)`, () => {
      beforeEach(async function() {
        this.source = undefined
      })
      describe(`with destination specified as a String ("${DESTINATION.FILE}")`, () => {
        beforeEach(async function() {
          this.destination = DESTINATION.FILE
        })
        assert.shouldBeRejected(SOURCE.SHOULD_BE_A_NON_EMPTY_STRING)
      })
      describe(`without destination (undefined)`, () => {
        beforeEach(async function() {
          this.destination = undefined
        })
        assert.shouldBeRejected(SOURCE.SHOULD_BE_A_NON_EMPTY_STRING)
      })
    })
  })
})
