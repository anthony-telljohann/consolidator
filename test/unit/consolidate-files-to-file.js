import { consolidateFilesToFile } from 'consolidator'
import { SOURCE, DESTINATION } from 'constants'
import is from 'is'
import test from 'ava'

test('is a function', async t => {
  t.true(is.fn(consolidateFilesToFile))
})

test('returns a Promise', async t => {
  t.true(
    is.instance(consolidateFilesToFile(SOURCE.FILES, DESTINATION.FILE), Promise)
  )
})

test('resolves undefined', async t => {
  t.true(is.undef(await consolidateFilesToFile(SOURCE.FILES, DESTINATION.FILE)))
})

test('throws TypeError', async t => {
  await t.throws(consolidateFilesToFile({}, {}))
})
