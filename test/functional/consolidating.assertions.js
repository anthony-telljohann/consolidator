import fs from 'async-file'
import randomatic from 'randomatic'

const DESTINATION_FILE = './destination/consolidated'
const SOURCE_FILES = [
  './sources/source1',
  './sources/source2',
  './sources/source3'
]

export default {
  shouldCreateDestinationFile() {
    beforeEach(async () => {
      this.destinationFile = {}
      try {
        this.destinationFile.created = await fs.exists(DESTINATION_FILE)
      } catch {
        this.destinationFile.created = false
      }
      try {
        this.destinationFile.data = await fs.readTextFile(DESTINATION_FILE)
      } catch {
        this.destinationFile.data = undefined
      }
      this.sourceFiles = await Promise.all(SOURCE_FILES.map(async (file) => {
        let sourceFile = {}
        try {
          sourceFile.removed = !await fs.exists(file)
        } catch {
          sourceFile.removed = false
        }
        try {
          sourceFile.data = await fs.readTextFile(file)
        } catch {
          sourceFile.data = undefined
        }
        return sourceFile
      }))
    })

    it(`should create a destination file`, async () => {
      this.destinationFile.created.should.be.true()
    })

    describe(`destination file`, () => {

      it(`should not be empty`, async () => {
        this.destinationFile.data.should.be.empty()
      })

      it(`should contain every source file`, async () => {
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
