import destinationFileFactory from '../factories/destination-file-factory.js'
import sourceFilesFactory from '../factories/source-files-factory.js'
import { consolidateGlobToFile as _consolidateGlobToFile } from 'consolidator'

export default {
  setup() {
    beforeEach(async function() {
      this.before = {}
      this.after = {}
      this.destinationFile = destinationFileFactory
      this.sourceFiles = sourceFilesFactory
      await this.destinationFile.remove()
      return Promise.all(
        this.sourceFiles.map(sourceFile => sourceFile.remove())
      )
    })
  },
  consolidateGlobToFile() {
    beforeEach(async function() {
      this.before.destinationFile = await this.destinationFile.read()
      this.before.sourceFiles = await this.sourceFiles.map(sourceFile =>
        sourceFile.read()
      )
      await _consolidateGlobToFile(
        './sources/*',
        './destination/consolidated.txt'
      )
      this.after.destinationFile = await this.destinationFile.read()
      this.after.sourceFiles = await this.sourceFiles.map(sourceFile =>
        sourceFile.read()
      )
    })
  },
  readFilesBeforeConsolidating() {
    beforeEach(async function() {
      this.before.destinationFile = await this.destinationFile.read()
      this.before.sourceFiles = await this.sourceFiles.map(sourceFile =>
        sourceFile.read()
      )
    })
  },
  readFilesAfterConsolidating() {
    beforeEach(async function() {
      this.after.destinationFile = await this.destinationFile.read()
      this.after.sourceFiles = await this.sourceFiles.map(sourceFile =>
        sourceFile.read()
      )
    })
  },
  teardown() {
    afterEach(async function() {
      await this.destinationFile.remove()
      return Promise.all(
        this.sourceFiles.map(sourceFile => sourceFile.remove())
      )
    })
  }
}
