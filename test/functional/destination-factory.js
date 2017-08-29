import randomatic from 'randomatic'

export default class DestinationFactory {
  constructor () {
    this.path = undefined
    this.data = undefined
  }
  destination () {
    this.path = path
    this.data = data
  }
  async create (path, data) {
    await fs.createDirectory('./destination')
  }
}
