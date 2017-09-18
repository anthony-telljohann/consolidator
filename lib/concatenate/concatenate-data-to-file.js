import is from "is";
import fs from "async-file";
import path from "path";

export default concatenateDataToFile;

async function concatenateDataToFile(sourceFileData, destinationFile) {
  if (!is.empty(sourceFileData.trim())) {
    let destinationDirectory = path.dirname(destinationFile);
    if (!await fs.exists(destinationDirectory)) {
      await fs.createDirectory(destinationDirectory);
    }
    return fs.appendFile(destinationFile, sourceFileData);
  }
}
