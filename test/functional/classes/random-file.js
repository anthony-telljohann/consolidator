import File from './file.js'
import path from 'path'
import randomatic from 'randomatic'

export default class RandomFile extends File {
  constructor(directory) {
    super(path.join(directory, randomatic('A', 10)))
  }
}
