import { consolidate } from 'consolidator'
import { SOURCE, SOURCES, DESTINATION } from 'constants'

const SOURCES_SHOULD_BE_AN_ARRAY_OR_A_NON_EMPTY_STRING = `sources should be an array or a non-empty string`
const DESTINATION_SHOULD_BE_NON_EMPTY_STRING = `destination should be a non-empty string`

describe(`consolidate`, () => {
  it(`should be a function`, async () => {
    consolidate.should.be.a.Function()
  })

  describe(`not specifying sources and not specifying destination`, () => {
    it(`should be rejected`, async () => {
      consolidate().should.be.rejected()
    })
    it(`should be rejected with TypeError`, async () => {
      consolidate().should.be.rejectedWith(TypeError)
    })
    it(`should be rejected with "${SOURCES_SHOULD_BE_AN_ARRAY_OR_A_NON_EMPTY_STRING}"`, async () => {
      consolidate().should.be.rejectedWith(
        SOURCES_SHOULD_BE_AN_ARRAY_OR_A_NON_EMPTY_STRING
      )
    })
  })

  describe(`not specifying sources and specifying destination as "${DESTINATION.FILE}"`, () => {
    it(`should be rejected`, async () => {
      consolidate(undefined, DESTINATION.FILE).should.be.rejected()
    })
    it(`should be rejected with TypeError`, async () => {
      consolidate(undefined, DESTINATION.FILE).should.be.rejectedWith(TypeError)
    })
    it(`should be rejected with "${SOURCES_SHOULD_BE_AN_ARRAY_OR_A_NON_EMPTY_STRING}"`, async () => {
      consolidate(undefined, DESTINATION.FILE).should.be.rejectedWith(
        SOURCES_SHOULD_BE_AN_ARRAY_OR_A_NON_EMPTY_STRING
      )
    })
  })
  describe(`specifying sources as "${SOURCES.GLOB}" and not specifying destination`, () => {
    it(`should be rejected`, async () => {
      consolidate(SOURCES.GLOB, undefined).should.be.rejected()
    })
    it(`should be rejected with TypeError`, async () => {
      consolidate(SOURCES.GLOB, undefined).should.be.rejectedWith(TypeError)
    })
    it(`should be rejected with "${DESTINATION_SHOULD_BE_NON_EMPTY_STRING}"`, async () => {
      consolidate(SOURCES.GLOB, undefined).should.be.rejectedWith(
        DESTINATION_SHOULD_BE_NON_EMPTY_STRING
      )
    })
  })
  describe(`specifying sources as [${SOURCE.FILES}] and not specifying destination`, () => {
    it(`should be rejected`, async () => {
      consolidate(SOURCE.FILES, undefined).should.be.rejected()
    })
    it(`should be rejected with TypeError`, async () => {
      consolidate(SOURCE.FILES, undefined).should.be.rejectedWith(TypeError)
    })
    it(`should be rejected with "${DESTINATION_SHOULD_BE_NON_EMPTY_STRING}"`, async () => {
      consolidate(SOURCE.FILES, undefined).should.be.rejectedWith(
        DESTINATION_SHOULD_BE_NON_EMPTY_STRING
      )
    })
  })
  describe(`specifying sources as "${SOURCES.GLOB}" and specifying destination as "${DESTINATION.FILE}"`, () => {
    it(`should be fulfilled`, async () => {
      consolidate(SOURCES.GLOB, DESTINATION.FILE).should.be.fulfilled()
    })
    it(`should be fulfilled with undefined`, async () => {
      consolidate(SOURCES.GLOB, DESTINATION.FILE).should.be.fulfilledWith(
        undefined
      )
    })
  })
  describe(`specifying sources as [${SOURCE.FILES}] and specifying destination as "${DESTINATION.FILE}"`, () => {
    it(`should be fulfilled`, async () => {
      consolidate(SOURCE.FILES, DESTINATION.FILE).should.be.fulfilled()
    })
    it(`should be fulfilled with undefined`, async () => {
      consolidate(SOURCE.FILES, DESTINATION.FILE).should.be.fulfilledWith(
        undefined
      )
    })
  })
})
