import { consolidateFileToFile } from 'consolidator'
import { SOURCE, DESTINATION } from 'constants'

describe('consolidateFileToFile', () => {
  it('should be a function', async () => {
    consolidateFileToFile.should.be.a.Function()
  })

  it('should return a Promise', async () => {
    consolidateFileToFile(SOURCE.FILE, DESTINATION.FILE).should.be.a.Promise()
  })

  it('should be fulfilled with undefined', async () => {
    consolidateFileToFile(
      SOURCE.FILE,
      DESTINATION.FILE
    ).should.be.fulfilledWith(undefined)
  })

  it('should be rejected with TypeError', async () => {
    consolidateFileToFile().should.be.rejectedWith(TypeError)
  })

  it('should be rejected with "source should be a non-empty string"', async () => {
    consolidateFileToFile().should.be.rejectedWith(
      'source should be a non-empty string'
    )
  })
})
