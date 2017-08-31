import File from './file.js'

export default class Files extends Array {
  async mock () {
    return Promise.all(this.map(file => file.mock()))
  }
  async remove () {
    return Promise.all(this.map(file => file.remove()))
  }
  async removeDirectory () {
    return Promise.all(this.map(file => file.removeDirectory()))
  }
  async read () {
    return Promise.all(this.map(file => file.read()))
  }
  async touch () {
    return Promise.all(this.map(file => file.touch()))
  }
}
