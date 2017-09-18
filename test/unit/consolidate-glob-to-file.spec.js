import { consolidateGlobToFile } from "consolidator";
import { SOURCES, DESTINATION } from "constants";
import assert from "unit/assertions";

describe(`consolidateGlobToFile`, () => {
  beforeEach(async function() {
    this.context = consolidateGlobToFile;
  });
  assert.shouldBeAFunction();
  describe(`not specifying source and not specifying destination`, () => {
    beforeEach(async function() {
      this.context = consolidateGlobToFile();
    });
    assert.shouldBeRejected(SOURCES.SHOULD_BE_NON_EMPTY_STRING);
  });
  describe(`not specifying sources and specifying destination as "${DESTINATION.FILE}"`, () => {
    beforeEach(async function() {
      this.context = consolidateGlobToFile(undefined, DESTINATION.FILE);
    });
    assert.shouldBeRejected(SOURCES.SHOULD_BE_NON_EMPTY_STRING);
  });
  describe(`specifying sources as "${SOURCES.GLOB}" and not specifying destination`, () => {
    beforeEach(async function() {
      this.context = consolidateGlobToFile(SOURCES.GLOB, undefined);
    });
    assert.shouldBeRejected(DESTINATION.SHOULD_BE_NON_EMPTY_STRING);
  });
  describe(`specifying sources as "${SOURCES.GLOB}" and specifying destination as "${DESTINATION.FILE}"`, () => {
    beforeEach(async function() {
      this.context = consolidateGlobToFile(SOURCES.GLOB, DESTINATION.FILE);
    });
    assert.shouldBeFulfilled();
  });
});
