import fs from 'async-file'
import path from 'path'
import randomatic from 'randomatic'

export default class File {
  constructor(filePath) {
    this.basename = path.basename(filePath)
    this.directory = path.dirname(filePath)
    this.path = filePath
  }
  async createDirectory() {
    return fs.createDirectory(this.directory)
  }
  async mock() {
    return this.write(randomatic('*', 100))
  }
  async remove() {
    return fs.delete(this.path)
  }
  async removeDirectory() {
    return fs.delete(this.directory)
  }
  async read() {
    let file = {}
    try {
      file.exists = await fs.exists(this.path)
    } catch (e) {
      file.exists = false
    }
    try {
      file.data = await fs.readTextFile(this.path)
    } catch (e) {
      file.data = null
    }
    return file
  }
  async touch() {
    return this.write('')
  }
  async write(data) {
    if (!await fs.exists(this.directory)) {
      await this.createDirectory()
    }
    return fs.writeTextFile(this.path, data)
  }
}
