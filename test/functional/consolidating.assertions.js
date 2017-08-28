import fs from 'async-file'
import randomatic from 'randomatic'

const DESTINATION_FILE = './destination/consolidated'

export default {
  shouldCreateDestinationFile() {
    beforeEach(async () => {
      this.destinationFile = {}
      this.destinationFile.created = await fs.exists(DESTINATION_FILE)
      this.destinationFile.data = await fs.readTextFile(DESTINATION_FILE)
    })

    it(`should create a destination file`, async () => {
      this.destinationFile.created.should.be.true()
    })

    describe(`destination file`, () => {

      it(`should contain string`, async () => {
        this.destinationFile.data.should.be.a.String()
      })

      it(`should contain data`, async () => {
        this.destinationFile.data.should.not.be.empty()
        this.destinationFile.data.should.exist()
      })

      it(`should contain every source file`, async () => {
        let sourceFiles = [
          './sources/source1',
          './sources/source2',
          './sources/source3'
        ]
        let destinationFileData = undefined
        var sourceFilesData = []
        console.log(`sourceFilesData`, sourceFilesData)
        if (await fs.exists('./destination/consolidated')) {
          destinationFileData = fs.readTextFile('./destination/consolidated')
        }
        await Promise.all(
          sourceFiles.map(async sourceFile => {
            console.log(`sourceFile`, sourceFile)
            let sourceFileData = undefined
            if (await fs.exists(sourceFile)) {
              sourceFileData = fs.readTextFile(sourceFile)
              console.log(`sourceFileData`, sourceFileData)
            }
            sourceFilesData.push(sourceFileData)
          })
        )
        sourceFilesData.forEach(sourceFileData => {
          destinationFileData.should.containEql(sourceFileData)
        })
      })
    })
  },
  shouldRemoveEverySourceFile() {
    it(`should remove every source file`, async () => {
      this.sourceFiles.map(async sourceFile => {
        let sourceFileExists = await fs.exists(sourceFile.path)
        sourceFileExists.should.be.false
      })
    })
  }
}
