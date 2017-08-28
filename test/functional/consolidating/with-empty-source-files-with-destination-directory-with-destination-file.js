beforeEach(fixture.setup.withEmptySourceFiles) //sourceFiles.touch()
beforeEach(fixture.setup.withDestinationDirectory) //destination.direc
beforeEach(fixture.setup.withDestinationFile)

afterEach(fixture.teardown.destinationFileDirectory)
afterEach(fixture.teardown.sourceFilesDirectory)




var file = new File('./sources', )

var sourceFiles = [
  'source/file1.txt',
  'source/file2.txt',
  'source/file3.txt'
]

var destination = {
  directory: './destination',
  file: this.directory + 'consolidated'
  data: undefined
}

sourceFiles.map(sourceFile => )
