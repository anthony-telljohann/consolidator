import randomatic from 'randomatic'

const path = './sources'

export default {
  async remove () {
    return ''
  },
  async touch () {
    return ''
  },
  async write () {
    return ''
  }
}

async function create () {
  if (!await fs.exists(path)) {
    await fs.createDirectory(path)
  }
  return fs.writeTextFile(path + randomatic('A', 10), randomatic('*', 100))
}
