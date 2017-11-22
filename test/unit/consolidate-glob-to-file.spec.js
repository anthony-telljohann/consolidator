import { consolidateGlobToFile } from 'consolidator'
import { SOURCES, DESTINATION } from 'constants'
import assert from 'unit/assertions'

describe(`consolidateGlobToFile`, () => {
  beforeEach(async function() {
    this.context = consolidateGlobToFile
  })
  assert.shouldBeAFunction()
  describe(`consolidating`, () => {
    beforeEach(async function() {
      this.context = function() {
        return consolidateGlobToFile(this.sources, this.destination)
      }
    })
    describe(`with sources specified as a String ("${SOURCES.GLOB}")`, () => {
      beforeEach(async function() {
        this.sources = SOURCES.GLOB
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
    describe(`without sources (undefined)`, () => {
      beforeEach(async function() {
        this.sources = undefined
      })
      describe(`with destination specified as a String ("${DESTINATION.FILE}")`, () => {
        beforeEach(async function() {
          this.destination = DESTINATION.FILE
        })
        assert.shouldBeRejected(SOURCES.SHOULD_BE_A_NON_EMPTY_STRING)
      })
      describe(`without destination (undefined)`, () => {
        beforeEach(async function() {
          this.destination = undefined
        })
        assert.shouldBeRejected(SOURCES.SHOULD_BE_A_NON_EMPTY_STRING)
      })
    })
  })
})
