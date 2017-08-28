import fs from 'async-file'
import randomatic from 'randomatic'

export default {
  shouldCreateDestinationFile() {
    it(`should create a destination file`, async () => {
      let destinationFileExists = await fs.exists('./destination/consolidated')
      destinationFileExists.should.be.true
    })

          describe(`destination file`, () => {
      it(`should contain every source file`, async () => {
        let sourceFiles = [
          './sources/source1',
          './sources/source2',
          './sources/source3'
        ]
        let destinationFileData = undefined
        let sourceFilesData = []
        if(await fs.exists('./destination/consolidated')){
          destinationFileData = fs.readTextFile('./destination/consolidated')
        }
        await Promise.all(sourceFiles.map(async sourceFile => {
          let sourceFileData = undefined
          if(await fs.exists(sourceFile)){
            sourceFileData = fs.readTextFile(sourceFile)
          }
          sourceFilesData.push(sourceFileData)
        }))
        sourceFilesData.each((sourceFileData) => {
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
