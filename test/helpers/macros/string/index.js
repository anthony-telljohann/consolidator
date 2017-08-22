import is from 'is'

export default contains

async function contains (t, string, strings) {
  t.true(strings.every(partial => string.contains(partial)))
}
contains.title = (title, string, strings) =>
  `${title} ${string} contains ${strings.join(' and ')}`.trim()
