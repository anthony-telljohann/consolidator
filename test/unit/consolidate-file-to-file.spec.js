import { consolidateFileToFile } from "consolidator";
import { SOURCE, DESTINATION } from "constants";
import assert from "unit/assertions";

describe(`consolidateFileToFile`, () => {
  beforeEach(async function() {
    this.context = consolidateFileToFile;
  });
  assert.shouldBeAFunction();
  describe(`not specifying source and not specifying destination`, () => {
    beforeEach(async function() {
      this.context = consolidateFileToFile();
    });
    assert.shouldBeRejected(SOURCE.SHOULD_BE_A_NON_EMPTY_STRING);
  });
  describe(`not specifying source and specifying destination as "${DESTINATION.FILE}"`, () => {
    beforeEach(async function() {
      this.context = consolidateFileToFile(undefined, DESTINATION.FILE);
    });
    assert.shouldBeRejected(SOURCE.SHOULD_BE_A_NON_EMPTY_STRING);
  });
  describe(`specifying source as "${SOURCE.FILE}" and not specifying destination`, () => {
    beforeEach(async function() {
      this.context = consolidateFileToFile(SOURCE.FILE, undefined);
    });
    assert.shouldBeRejected(DESTINATION.SHOULD_BE_A_NON_EMPTY_STRING);
  });
  describe(`specifying source as "${SOURCE.FILE}" and specifying destination as "${DESTINATION.FILE}"`, () => {
    beforeEach(async function() {
      this.context = consolidateFileToFile(SOURCE.FILE, DESTINATION.FILE);
    });
    assert.shouldBeFulfilled();
  });
});
