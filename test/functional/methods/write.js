import fs from 'fs-extra-promise'

export default async function write (file, data) {
  await fs.createFileAsync(file)
  return fs.writeFileAsync(file, data)
}
