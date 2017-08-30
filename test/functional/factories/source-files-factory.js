import File from '../classes/file.js'
import randomatic from 'randomatic'

export default [...new Array(10)].map(
  () => new File('./sources/' + randomatic('A', 10))
)
