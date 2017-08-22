import { consolidateFileToFile } from 'consolidator'
import { SOURCE, DESTINATION } from 'constants'
import is from 'is'
import test from 'ava'

// consolidating
// given source files do not exist
// given source files are empty
// given source files have data

// given destination file does not exist
// given destination file is empty
// given destination file has data

//  source files do not exist and destination file does not exist

// destination file data
//
// source file
// source file data
//
// source files
// source files data

test('is a function', async t => {
  t.true(is.fn(consolidateFileToFile))
})

test('returns a Promise', async t => {
  t.true(
    is.instance(consolidateFileToFile(SOURCE.FILE, DESTINATION.FILE), Promise)
  )
})

test('resolves undefined', async t => {
  t.true(is.undef(await consolidateFileToFile(SOURCE.FILE, DESTINATION.FILE)))
})

test('throws TypeError', async t => {
  await t.throws(consolidateFileToFile({}, {}))
})
