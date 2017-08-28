import File from './file.js'
import path from 'path'

const DIRECTORY = './sources'

export default class SourceFile extends File {
  constructor (basename) {
    super(path.join(DIRECTORY, basename))
  }
}
