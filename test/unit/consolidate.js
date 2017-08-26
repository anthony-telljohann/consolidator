import { consolidate } from 'consolidator'
import { SOURCES, DESTINATION } from 'constants'

describe('consolidate', () => {
  it('should be a function', async () => {
    consolidate.should.be.a.Function()
  })

  it('should return a Promise', async () => {
    consolidate(SOURCES.GLOB, DESTINATION.FILE).should.be.a.Promise()
  })

  it('should be fulfilled with undefined', async () => {
    consolidate(SOURCES.GLOB, DESTINATION.FILE).should.be.fulfilledWith(
      undefined
    )
  })

  it('should be rejected with TypeError', async () => {
    consolidate().should.be.rejectedWith(TypeError)
  })

  it('should be rejected with "sources should be an array or a non-empty string"', async () => {
    consolidate().should.be.rejectedWith(
      'sources should be an array or a non-empty string'
    )
  })
})
