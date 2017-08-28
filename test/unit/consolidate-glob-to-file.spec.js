import { consolidateGlobToFile } from 'consolidator'
import { SOURCES, DESTINATION } from 'constants'

const SOURCES_SHOULD_BE_NON_EMPTY_STRING = `sources should be a non-empty string`
const DESTINATION_SHOULD_BE_NON_EMPTY_STRING = `destination should be a non-empty string`

describe(`consolidateGlobToFile`, () => {
  it(`should be a function`, async () => {
    consolidateGlobToFile.should.be.a.Function()
  })

  describe(`not specifying sources and not specifying destination`, () => {
    it(`should be rejected`, async () => {
      consolidateGlobToFile().should.be.rejected()
    })
    it(`should be rejected with TypeError`, async () => {
      consolidateGlobToFile().should.be.rejectedWith(TypeError)
    })
    it(`should be rejected with "${SOURCES_SHOULD_BE_NON_EMPTY_STRING}"`, async () => {
      consolidateGlobToFile().should.be.rejectedWith(
        SOURCES_SHOULD_BE_NON_EMPTY_STRING
      )
    })
  })

  describe(`not specifying sources and specifying destination as "${DESTINATION.FILE}"`, () => {
    it(`should be rejected`, async () => {
      consolidateGlobToFile(undefined, DESTINATION.FILE).should.be.rejected()
    })
    it(`should be rejected with TypeError`, async () => {
      consolidateGlobToFile(undefined, DESTINATION.FILE).should.be.rejectedWith(
        TypeError
      )
    })
    it(`should be rejected with "${SOURCES_SHOULD_BE_NON_EMPTY_STRING}"`, async () => {
      consolidateGlobToFile(undefined, DESTINATION.FILE).should.be.rejectedWith(
        SOURCES_SHOULD_BE_NON_EMPTY_STRING
      )
    })
  })
  describe(`specifying sources as "${SOURCES.GLOB}" and not specifying destination`, () => {
    it(`should be rejected`, async () => {
      consolidateGlobToFile(SOURCES.GLOB, undefined).should.be.rejected()
    })
    it(`should be rejected with TypeError`, async () => {
      consolidateGlobToFile(SOURCES.GLOB, undefined).should.be.rejectedWith(
        TypeError
      )
    })
    it(`should be rejected with "${DESTINATION_SHOULD_BE_NON_EMPTY_STRING}"`, async () => {
      consolidateGlobToFile(SOURCES.GLOB, undefined).should.be.rejectedWith(
        DESTINATION_SHOULD_BE_NON_EMPTY_STRING
      )
    })
  })
  describe(`specifying sources as "${SOURCES.GLOB}" and specifying destination as "${DESTINATION.FILE}"`, () => {
    it(`should be fulfilled`, async () => {
      consolidateGlobToFile(
        SOURCES.GLOB,
        DESTINATION.FILE
      ).should.be.fulfilled()
    })
    it(`should be fulfilled with undefined`, async () => {
      consolidateGlobToFile(
        SOURCES.GLOB,
        DESTINATION.FILE
      ).should.be.fulfilledWith(undefined)
    })
  })
})
