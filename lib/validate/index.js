import ConsolidatableValidator from "./consolidatable-validator/index.js";
import StringValidator from "./string-validator/index.js";

const destination = new StringValidator("destination");
const source = new StringValidator("source");
const sources = new ConsolidatableValidator("sources");

export default {
  destination,
  source,
  sources
};
