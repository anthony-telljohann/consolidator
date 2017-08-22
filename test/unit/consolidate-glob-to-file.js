import { consolidateGlobToFile } from 'consolidator'
import { SOURCES, DESTINATION } from 'constants'
import is from 'is'
import test from 'ava'

test('is a function', async t => {
  t.true(is.fn(consolidateGlobToFile))
})

test('returns a Promise', async t => {
  t.true(
    is.instance(consolidateGlobToFile(SOURCES.GLOB, DESTINATION.FILE), Promise)
  )
})

test('resolves undefined', async t => {
  t.true(is.undef(await consolidateGlobToFile(SOURCES.GLOB, DESTINATION.FILE)))
})

test('throws TypeError', async t => {
  await t.throws(consolidateGlobToFile({}, {}))
})
