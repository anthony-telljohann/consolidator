import { consolidateFilesToFile } from 'consolidator'
import { SOURCE, DESTINATION } from 'constants'

const SOURCES_SHOULD_BE_AN_ARRAY = `sources should be an array`
const DESTINATION_SHOULD_BE_NON_EMPTY_STRING = `destination should be a non-empty string`

describe(`consolidateFilesToFile`, () => {
  it(`should be a function`, async () => {
    consolidateFilesToFile.should.be.a.Function()
  })

  describe(`not specifying sources and not specifying destination`, () => {
    it(`should be rejected`, async () => {
      consolidateFilesToFile().should.be.rejected()
    })
    it(`should be rejected with TypeError`, async () => {
      consolidateFilesToFile().should.be.rejectedWith(TypeError)
    })
    it(`should be rejected with "${SOURCES_SHOULD_BE_AN_ARRAY}"`, async () => {
      consolidateFilesToFile().should.be.rejectedWith(
        SOURCES_SHOULD_BE_AN_ARRAY
      )
    })
  })

  describe(`not specifying sources and specifying destination as "${DESTINATION.FILE}"`, () => {
    it(`should be rejected`, async () => {
      consolidateFilesToFile(undefined, DESTINATION.FILE).should.be.rejected()
    })
    it(`should be rejected with TypeError`, async () => {
      consolidateFilesToFile(
        undefined,
        DESTINATION.FILE
      ).should.be.rejectedWith(TypeError)
    })
    it(`should be rejected with "${SOURCES_SHOULD_BE_AN_ARRAY}"`, async () => {
      consolidateFilesToFile(
        undefined,
        DESTINATION.FILE
      ).should.be.rejectedWith(SOURCES_SHOULD_BE_AN_ARRAY)
    })
  })
  describe(`specifying sources as [${SOURCE.FILES}] and not specifying destination`, () => {
    it(`should be rejected`, async () => {
      consolidateFilesToFile(SOURCE.FILES, undefined).should.be.rejected()
    })
    it(`should be rejected with TypeError`, async () => {
      consolidateFilesToFile(SOURCE.FILES, undefined).should.be.rejectedWith(
        TypeError
      )
    })
    it(`should be rejected with "${DESTINATION_SHOULD_BE_NON_EMPTY_STRING}"`, async () => {
      consolidateFilesToFile(SOURCE.FILES, undefined).should.be.rejectedWith(
        DESTINATION_SHOULD_BE_NON_EMPTY_STRING
      )
    })
  })
  describe(`specifying sources as [${SOURCE.FILES}] and specifying destination as "${DESTINATION.FILE}"`, () => {
    it(`should be fulfilled`, async () => {
      consolidateFilesToFile(
        SOURCE.FILES,
        DESTINATION.FILE
      ).should.be.fulfilled()
    })
    it(`should be fulfilled with undefined`, async () => {
      consolidateFilesToFile(
        SOURCE.FILES,
        DESTINATION.FILE
      ).should.be.fulfilledWith(undefined)
    })
  })
})
