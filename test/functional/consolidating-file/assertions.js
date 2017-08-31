export default {
  shouldConsolidate,
  shouldNotConsolidate
}

function shouldConsolidate() {
  it(`should create a destination file`, async function() {
    this.after.destinationFile.exists.should.be.true()
  })

  it(`should remove source file`, async function() {
    this.after.sourceFile.exists.should.be.false()
  })

  describe(`destination file`, () => {
    it(`should not be empty`, async function() {
      this.after.destinationFile.data.should.not.be.empty()
    })

    it(`should contain source file`, async function() {
      this.after.destinationFile.data.should.containEql(
        this.before.sourceFile.data
      )
    })

    it(`should only contain source files`, async function() {
      let destinationFileData = this.after.destinationFile.data
      destinationFileData = destinationFileData.replace(
        this.before.sourceFile.data,
        ''
      )
      destinationFileData.should.be.empty()
    })
  })
}

function shouldNotConsolidate() {
  it(`should not create a destination file`, async function() {
    this.after.destinationFile.exists.should.be.false()
  })

  it(`should remove source file`, async function() {
    this.after.sourceFile.exists.should.be.false()
  })
}
