export default function shouldNotConsolidate() {
  it(`should not create a destination file`, async function() {
    this.after.destinationFile.exists.should.be.false()
  })

  it(`should remove every source file`, async function() {
    this.after.sourceFiles.forEach(sourceFile => {
      sourceFile.exists.should.be.false()
    })
  })
}
