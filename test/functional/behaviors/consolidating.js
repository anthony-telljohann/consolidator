














export default {
  async shouldCreateDestination() {
    return
  },
  async shouldAppendSourcesToDestination() {
    return
  },
  async shouldRemoveSources() {
    return
  },
  async shouldRemovePreExistingDestination() {
    return
  }
}

var before = {
  destinationFile: {
    exists: ,
    data:
  },
  sourceFiles
}

var after = {
  destinationFile,
  sourceFiles,
}

async function foo() {
  it(`should create a destination file`, async () => {
    this.destinationFile.should.exist
  })

  it(`should remove every source file`, async () => {
    this.after.sourceFiles.every(sourceFile => {
      should.not.exist(sourceFile)
    })
  })

  describe(`destination file`, () => {
    it(`should not be empty`, async () => {
      this.after.destinationFile.should.not.be.empty
    })

    it(`should include every source file`, async () => {
      preConsolidated.sourceFiles.every(sourceFile => {
        postConsolidated.destinationFile.should.containEql(sourceFileData)
      })
    })
  })
}
