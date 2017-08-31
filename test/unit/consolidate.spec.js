import { consolidate } from 'consolidator'
import { SOURCE, SOURCES, DESTINATION } from 'constants'
import assert from 'unit/assertions'

describe(`consolidate`, () => {
  beforeEach(async function () {
    this.context = consolidate
  })
  assert.shouldBeAFunction()
  describe(`not specifying source and not specifying destination`, () => {
    beforeEach(async function () {
      this.context = consolidate()
    })
    assert.shouldBeRejected(SOURCES.SHOULD_BE_AN_ARRAY_OR_A_NON_EMPTY_STRING)
  })
  describe(`not specifying sources and specifying destination as "${DESTINATION.FILE}"`, () => {
    beforeEach(async function () {
      this.context = consolidate(undefined, DESTINATION.FILE)
    })
    assert.shouldBeRejected(SOURCES.SHOULD_BE_AN_ARRAY_OR_A_NON_EMPTY_STRING)
  })
  describe(`specifying sources as [${SOURCE.FILES}] and not specifying destination`, () => {
    beforeEach(async function () {
      this.context = consolidate(SOURCE.FILES, undefined)
    })
    assert.shouldBeRejected(DESTINATION.SHOULD_BE_NON_EMPTY_STRING)
  })
  describe(`specifying sources as "${SOURCES.GLOB}" and not specifying destination`, () => {
    beforeEach(async function () {
      this.context = consolidate(SOURCES.GLOB, undefined)
    })
    assert.shouldBeRejected(DESTINATION.SHOULD_BE_NON_EMPTY_STRING)
  })
  describe(`specifying sources as [${SOURCE.FILES}] and specifying destination as "${DESTINATION.FILE}"`, () => {
    beforeEach(async function () {
      this.context = consolidate(SOURCE.FILES, DESTINATION.FILE)
    })
    assert.shouldBeFulfilled()
  })
  describe(`specifying sources as "${SOURCES.GLOB}" and specifying destination as "${DESTINATION.FILE}"`, () => {
    beforeEach(async function () {
      this.context = consolidate(SOURCES.GLOB, DESTINATION.FILE)
    })
    assert.shouldBeFulfilled()
  })
})
