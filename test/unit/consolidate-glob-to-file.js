import { consolidateGlobToFile } from 'consolidator'
import { SOURCES, DESTINATION } from 'constants'

describe('consolidateGlobToFile', () => {
  it('should be a function', async () => {
    consolidateGlobToFile.should.be.a.Function()
  })

  it('should return a Promise', async () => {
    consolidateGlobToFile(SOURCES.GLOB, DESTINATION.FILE).should.be.a.Promise()
  })

  it('should be fulfilled with undefined', async () => {
    consolidateGlobToFile(
      SOURCES.GLOB,
      DESTINATION.FILE
    ).should.be.fulfilledWith(undefined)
  })

  it('should be rejected with TypeError', async () => {
    consolidateGlobToFile().should.be.rejectedWith(TypeError)
  })

  it('should be rejected with "sources should be a non-empty string"', async () => {
    consolidateGlobToFile().should.be.rejectedWith(
      'sources should be a non-empty string'
    )
  })
})
