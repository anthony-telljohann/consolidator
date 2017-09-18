import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import prettier from "rollup-plugin-prettier";

let outputFile;
if (process.env.BABEL_ENV === "es") {
  outputFile = pkg.module;
} else {
  outputFile = pkg.main;
}

export default {
  input: `lib/consolidator.js`,
  output: {
    file: outputFile,
    format: process.env.BABEL_ENV
  },
  external: Object.keys(pkg.dependencies),
  plugins: [babel(), prettier()]
};
