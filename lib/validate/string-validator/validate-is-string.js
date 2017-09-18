import is from "is";
import { SHOULD_BE_A_NON_EMPTY_STRING } from "./message.js";

export default Base =>
  class extends Base {
    isString(value) {
      if (!(is.string(value) && !is.empty(value.trim()))) {
        throw new TypeError(`${this.name} ${SHOULD_BE_A_NON_EMPTY_STRING}`);
      }
    }
  };
