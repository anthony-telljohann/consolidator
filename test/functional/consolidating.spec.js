import { consolidate } from "consolidator";
import assert from "functional/assertions";
import { File, RandomFiles } from "functional/classes";
import { DESTINATION, SOURCES } from "constants";

function consolidateFiles() {
  beforeEach(async function() {
    this.before = {};
    this.after = {};
    this.before.destinationFile = await this.destinationFile.read();
    this.before.sourceFiles = await this.sourceFiles.read();
    await consolidate(SOURCES.GLOB, DESTINATION.FILE);
    this.after.destinationFile = await this.destinationFile.read();
    this.after.sourceFiles = await this.sourceFiles.read();
  });
}

describe(`consolidating files to file`, () => {
  beforeEach(async function() {
    this.destinationFile = new File(DESTINATION.FILE);
    this.sourceFiles = new RandomFiles(SOURCES.DIRECTORY, 10);
    await this.destinationFile.removeDirectory();
    await this.sourceFiles.removeDirectory();
  });
  describe("source files exist", () => {
    beforeEach(async function() {
      await this.sourceFiles.touch();
    });
    describe("source files contain data", () => {
      beforeEach(async function() {
        await this.sourceFiles.mock();
      });
      describe("destination directory exists", () => {
        beforeEach(async function() {
          await this.destinationFile.createDirectory();
        });
        describe("destination file exists", () => {
          beforeEach(async function() {
            await this.destinationFile.touch();
          });
          describe("destination file contains data", () => {
            beforeEach(async function() {
              await this.destinationFile.mock();
            });
            consolidateFiles();
            assert.shouldConsolidate();
          });
          describe("destination file does not contain data", () => {
            consolidateFiles();
            assert.shouldConsolidate();
          });
        });
        describe("destination file does not exist", () => {
          beforeEach(async function() {
            await this.destinationFile.remove();
          });
          consolidateFiles();
          assert.shouldConsolidate();
        });
      });
      describe("destination directory does not exist", () => {
        beforeEach(async function() {
          await this.destinationFile.removeDirectory();
        });
        consolidateFiles();
        assert.shouldConsolidate();
      });
    });
    describe("source files do not contain data", () => {
      describe("destination directory exists", () => {
        beforeEach(async function() {
          await this.destinationFile.createDirectory();
        });
        describe("destination file exists", () => {
          beforeEach(async function() {
            await this.destinationFile.touch();
          });
          describe("destination file contains data", () => {
            beforeEach(async function() {
              await this.destinationFile.mock();
            });
            consolidateFiles();
            assert.shouldNotConsolidate();
          });
          describe("destination file does not contain data", () => {
            consolidateFiles();
            assert.shouldNotConsolidate();
          });
        });
        describe("destination file does not exist", () => {
          beforeEach(async function() {
            await this.destinationFile.remove();
          });
          consolidateFiles();
          assert.shouldNotConsolidate();
        });
      });
      describe("destination directory does not exist", () => {
        beforeEach(async function() {
          await this.destinationFile.removeDirectory();
        });
        consolidateFiles();
        assert.shouldNotConsolidate();
      });
    });
  });
  describe("source files do not exist", () => {
    beforeEach(async function() {
      await this.sourceFiles.remove();
    });
    describe("destination directory exists", () => {
      beforeEach(async function() {
        await this.destinationFile.createDirectory();
      });
      describe("destination file exists", () => {
        beforeEach(async function() {
          await this.destinationFile.touch();
        });
        describe("destination file contains data", () => {
          beforeEach(async function() {
            await this.destinationFile.mock();
          });
          consolidateFiles();
          assert.shouldNotConsolidate();
        });
        describe("destination file does not contain data", () => {
          consolidateFiles();
          assert.shouldNotConsolidate();
        });
      });
      describe("destination file does not exist", () => {
        beforeEach(async function() {
          await this.destinationFile.remove();
        });
        consolidateFiles();
        assert.shouldNotConsolidate();
      });
    });
    describe("destination directory does not exist", () => {
      beforeEach(async function() {
        await this.destinationFile.removeDirectory();
      });
      consolidateFiles();
      assert.shouldNotConsolidate();
    });
  });
  afterEach(async function() {
    await this.destinationFile.removeDirectory();
    await this.sourceFiles.removeDirectory();
  });
});
