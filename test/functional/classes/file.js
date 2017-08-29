import randomatic from 'randomatic'
import fs from 'async-file'
import path from 'path'

export default class File {
  constructor (filePath) {
    let file = path.parse(filePath)
    this.path = path.normalize(filePath)
    this.directory = file.dir
    this.name = file.base
    this.data = undefined
  }
  async create (data = '') {
    if (!await fs.exists(this.directory)) {
      await fs.createDirectory(this.directory)
    }
    return fs.writeTextFile(this.path, data)
  }
  async createRandom () {
    return this.create(randomatic('*', 100))
  }
  async read () {
    if (await fs.exists(this.path)) {
      this.data = await fs.readTextFile(this.path)
    }
  }
  async remove () {
    return fs.delete(this.path)
  }
  async touch () {
    return this.create()
  }
}
