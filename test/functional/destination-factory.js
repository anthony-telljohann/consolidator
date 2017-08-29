import randomatic from 'randomatic'

export default class DestinationFactory {
  constructor(){
    this.path = undefined
    this.data = undefined
  }
  destination(path, data) {
    this.path = path
    this.data = data
  }
  create() {
    await fs.createDirectory('./destination')
  }
}
