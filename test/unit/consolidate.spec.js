import { consolidate } from 'consolidator'
import { SOURCE, SOURCES, DESTINATION } from 'constants'
import assert from 'unit/assertions'

describe(`consolidate`, () => {
  beforeEach(async function() {
    this.context = consolidate
  })
  assert.shouldBeAFunction()
  describe(`consolidating`, () => {
    beforeEach(async function() {
      this.context = function() {
        return consolidate(this.sources, this.destination)
      }
    })
    describe(`with sources specified as an Array ([${SOURCE.FILES}])`, () => {
      beforeEach(async function() {
        this.sources = SOURCE.FILES
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
        assert.shouldBeRejected(
          SOURCES.SHOULD_BE_AN_ARRAY_OR_A_NON_EMPTY_STRING
        )
      })
      describe(`without destination (undefined)`, () => {
        beforeEach(async function() {
          this.destination = undefined
        })
        assert.shouldBeRejected(
          SOURCES.SHOULD_BE_AN_ARRAY_OR_A_NON_EMPTY_STRING
        )
      })
    })
  })
})
