import File from './file.js'
import fs from 'async-file'
import path from 'path'

const DIRECTORY = './destination'

export default class DestinationFile extends File {
  constructor(basename) {
    super(path.join(DIRECTORY, basename))
  }
  createDirectory() {
    if(!await fs.exists(this.directory)){
      await fs.createDirectory(this.directory)
    }
  }
}
