import { consolidate } from 'consolidator'
import macros from 'macros'
import test from 'ava'

test.beforeEach(macros.sourcesDirectory.remove)
test.beforeEach(macros.destinationFile.remove)
test.beforeEach(macros.sourceFiles.create)
test.beforeEach(macros.destinationFile.create)
test.beforeEach(macros.sourceFiles.readBefore)
test.beforeEach(macros.destinationFile.readBefore)
test.beforeEach(macros.consolidator.consolidate)
test.beforeEach(macros.sourceFiles.readAfter)
test.beforeEach(macros.destinationFile.readAfter)

test(async t => {
  await macros.destinationFile.replaced(t)
})
test(async t => {
  await macros.sourceFiles.consolidated(t)
})

test.after.always(macros.sourcesDirectory.remove)
test.after.always(macros.destinationFile.remove)
