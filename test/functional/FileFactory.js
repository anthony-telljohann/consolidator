import fs from 'async-file'
import path from 'path'

class FileFactory {
  constructor(filePath) {
    this.basename = path.basename(filePath)
    this.directory = path.dirname(filePath)
    this.path = filePath
    this.data = undefined
    this.exists = undefined
  }
  async exists() {
    try {
      this.exists = await fs.exists(this.path)
    } catch (e) {
      this.exists = false
    }
    return this.exists
  }
  async createDirectory() {
    return fs.createDirectory(this.directory)
  }
  async remove() {
    return fs.delete(this.path)
  }
  async removeDirectory() {
    return fs.delete(this.directory)
  }
  async read() {
    try {
      this.data = await fs.readTextFile(this.path)
    } catch (e) {
      this.data = null
    }
  }
  reset() {
    this.data = undefined
    this.exists = undefined
  }
  async touch() {   
    return this.write('')
  }
  async write(data) {
    if(!await fs.exists(this.directory)) {
      await this.createDirectory()
    }
    return fs.writeTextFile(this.path, data)
  }
}
