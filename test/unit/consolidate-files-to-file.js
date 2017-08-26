import { consolidateFilesToFile } from 'consolidator'
import { SOURCE, DESTINATION } from 'constants'

describe('consolidateFilesToFile', () => {
  it('should be a function', async () => {
    consolidateFilesToFile.should.be.a.Function()
  })

  it('should return a Promise', async () => {
    consolidateFilesToFile(SOURCE.FILES, DESTINATION.FILE).should.be.a.Promise()
  })

  it('should be fulfilled with undefined', async () => {
    consolidateFilesToFile(
      SOURCE.FILES,
      DESTINATION.FILE
    ).should.be.fulfilledWith(undefined)
  })

  it('should be rejected with TypeError', async () => {
    consolidateFilesToFile().should.be.rejectedWith(TypeError)
  })

  it('should be rejected with "sources should be an array"', async () => {
    consolidateFilesToFile().should.be.rejectedWith(
      'sources should be an array'
    )
  })
})
