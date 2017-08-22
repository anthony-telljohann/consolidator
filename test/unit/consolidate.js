import { consolidate } from 'consolidator'
import { SOURCES, DESTINATION } from 'constants'
import is from 'is'
import test from 'ava'

test('is a function', async t => {
  t.true(is.fn(consolidate))
})

test('returns a Promise', async t => {
  t.true(is.instance(consolidate(SOURCES.GLOB, DESTINATION.FILE), Promise))
})

test('resolves undefined', async t => {
  t.true(is.undef(await consolidate(SOURCES.GLOB, DESTINATION.FILE)))
})

test('throws TypeError', async t => {
  await t.throws(consolidate({}, {}))
})
