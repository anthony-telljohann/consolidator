import Files from "./files.js";
import RandomFile from "./random-file.js";

const _directory = new WeakMap();

export default class RandomFiles extends Files {
  constructor(directory, count) {
    super(0);
    while (this.length < count) {
      this.push(new RandomFile(directory));
    }
  }
}
