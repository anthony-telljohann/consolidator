export default function shouldConsolidate () {
  it(`should create a destination file`, async function () {
    this.after.destinationFile.exists.should.be.true()
  })

  it(`should remove every source file`, async function () {
    this.after.sourceFiles.forEach(sourceFile => {
      sourceFile.exists.should.be.false()
    })
  })

  describe(`destination file`, () => {
    it(`should not be empty`, async function () {
      this.after.destinationFile.data.should.not.be.empty()
    })

    it(`should contain every source file`, async function () {
      this.before.sourceFiles.forEach(sourceFile => {
        this.after.destinationFile.data.should.containEql(sourceFile.data)
      })
    })

    it(`should only contain source files`, async function () {
      let destinationFileData = this.after.destinationFile.data
      this.before.sourceFiles.forEach(sourceFile => {
        destinationFileData = destinationFileData.replace(sourceFile.data, '')
      })
      destinationFileData.should.be.empty()
    })
  })
}
