// rollup.config.js
import json from 'rollup-plugin-json';

export default {
    input: 'src/index.ts',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [ json() ]
};
