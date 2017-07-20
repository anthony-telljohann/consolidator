import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import builtins from 'rollup-plugin-node-builtins'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

export default [
  {
    entry: 'lib/consolidator.js',
    dest: pkg.browser,
    format: 'umd',
    moduleName: 'consolidator',
    plugins: [
      builtins(),
      resolve({
        browser: true
      }),
      commonjs(),
      babel(babelrc())
    ]
  },
  {
    entry: 'lib/consolidator.js',
    external: Object.keys(pkg.dependencies),
    targets: [
      { dest: pkg.main, format: 'cjs' },
      { dest: pkg.module, format: 'es' }
    ],
    plugins: [babel(babelrc())]
  }
]
