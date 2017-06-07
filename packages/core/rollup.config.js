import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
const pkg = require('./package.json')

export default {
    entry : `compiled/core.js`,
    targets : [
        {
            dest: pkg.main,
            moduleName: 'blit.core',
            format: 'umd'
        }, {
            dest: pkg.module,
            format: 'es'
        }
    ],
    sourceMap : true,
    external : [],
    plugins : [commonjs(), resolve()]
}
