import is from "is";
import { SHOULD_BE_AN_ARRAY_OR_A_NON_EMPTY_STRING } from "./message.js";

export default Base =>
  class extends Base {
    isConsolidatable(value) {
      if (!is.array(value) && !(is.string(value) && !is.empty(value.trim()))) {
        throw new TypeError(
          `${this.name} ${SHOULD_BE_AN_ARRAY_OR_A_NON_EMPTY_STRING}`
        );
      }
    }
  };
