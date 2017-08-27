import { consolidateFileToFile } from 'consolidator'
import { SOURCE, DESTINATION } from 'constants'

const SOURCE_SHOULD_BE_NON_EMPTY_STRING = `source should be a non-empty string`
const DESTINATION_SHOULD_BE_NON_EMPTY_STRING = `destination should be a non-empty string`

describe(`consolidateFileToFile`, () => {
  it(`should be a function`, async () => {
    consolidateFileToFile.should.be.a.Function()
  })

  describe(`not specifying source and not specifying destination`, () => {
    it(`should be rejected`, async () => {
      consolidateFileToFile().should.be.rejected()
    })
    it(`should be rejected with TypeError`, async () => {
      consolidateFileToFile().should.be.rejectedWith(TypeError)
    })
    it(`should be rejected with "${SOURCE_SHOULD_BE_NON_EMPTY_STRING}"`, async () => {
      consolidateFileToFile().should.be.rejectedWith(
        SOURCE_SHOULD_BE_NON_EMPTY_STRING
      )
    })
  })

  describe(`not specifying source and specifying destination as "${DESTINATION.FILE}"`, () => {
    it(`should be rejected`, async () => {
      consolidateFileToFile(undefined, DESTINATION.FILE).should.be.rejected()
    })
    it(`should be rejected with TypeError`, async () => {
      consolidateFileToFile(undefined, DESTINATION.FILE).should.be.rejectedWith(
        TypeError
      )
    })
    it(`should be rejected with "${SOURCE_SHOULD_BE_NON_EMPTY_STRING}"`, async () => {
      consolidateFileToFile(undefined, DESTINATION.FILE).should.be.rejectedWith(
        SOURCE_SHOULD_BE_NON_EMPTY_STRING
      )
    })
  })
  describe(`specifying source as "${SOURCE.FILE}" and not specifying destination`, () => {
    it(`should be rejected`, async () => {
      consolidateFileToFile(SOURCE.FILE, undefined).should.be.rejected()
    })
    it(`should be rejected with TypeError`, async () => {
      consolidateFileToFile(SOURCE.FILE, undefined).should.be.rejectedWith(
        TypeError
      )
    })
    it(`should be rejected with "${DESTINATION_SHOULD_BE_NON_EMPTY_STRING}"`, async () => {
      consolidateFileToFile(SOURCE.FILE, undefined).should.be.rejectedWith(
        DESTINATION_SHOULD_BE_NON_EMPTY_STRING
      )
    })
  })
  describe(`specifying source as "${SOURCE.FILE}" and specifying destination as "${DESTINATION.FILE}"`, () => {
    it(`should be fulfilled`, async () => {
      consolidateFileToFile(SOURCE.FILE, DESTINATION.FILE).should.be.fulfilled()
    })
    it(`should be fulfilled with undefined`, async () => {
      consolidateFileToFile(
        SOURCE.FILE,
        DESTINATION.FILE
      ).should.be.fulfilledWith(undefined)
    })
  })
})
