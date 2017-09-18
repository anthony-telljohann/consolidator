import IsArray from "../array-validator/validate-is-array.js";
import IsConsolidatable from "./validate-is-consolidatable.js";
import IsString from "../string-validator/validate-is-string.js";
import Validator from "../validator/index.js";

export default class ConsolidatableValidator extends IsConsolidatable(
  IsString(IsArray(Validator))
) {
  constructor(name) {
    super(name);
  }
}
