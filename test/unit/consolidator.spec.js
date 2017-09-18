import * as consolidator from "consolidator";

describe(`consolidator`, () => {
  it(`should consolidate file to file`, async () => {
    consolidator.should.have.property("consolidateFileToFile");
  });

  it(`should consolidate files to file`, async () => {
    consolidator.should.have.property("consolidateFilesToFile");
  });

  it(`should consolidate glob to file`, async () => {
    consolidator.should.have.property("consolidateGlobToFile");
  });

  it(`should consolidate`, async () => {
    consolidator.should.have.property("consolidate");
  });
});
