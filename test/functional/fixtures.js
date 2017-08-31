export default {
  async removeDirectories() {
    this.destinationFile = new File(DESTINATION_FILE)
    this.sourceFiles = new RandomFiles(SOURCES_DIRECTORY, 10)
    await this.destinationFile.removeDirectory()
    await this.sourceFiles.removeDirectory()
  }
}
