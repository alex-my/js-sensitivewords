import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import {
    eslint,
} from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import {
    terser,
} from 'rollup-plugin-terser';

const ENV = process.env.NODE_ENV.trim();
const paths = {
    input: {
        root: 'src/index.js',
    },
    output: {
        root: 'dist/',
    },
};
const fileNames = {
    development: 'index.js',
    production: 'index.js',
    production6: 'index.esm.js',
};
const fileName = fileNames[ENV];
export default {
    input: `${paths.input.root}`,
    output: {
        file: `${paths.output.root}${fileName}`,
        format: ENV === 'production6' ? 'es' : 'umd',
        name: 'index'
    },
    plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true,
        }),
        eslint({
            include: ['src/**'],
            exclude: ['node_modules/**', 'dist/**'],
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        }),
        replace({
            exclude: 'node_modules/**',
            ENVIRONMENT: JSON.stringify(process.env.NODE_ENV),
        }),
        ENV && ENV.includes('production') && terser({
            output: {
                comments: /^!/,
            },
        }),
        // 放最后，能有效避免各种问题
        commonjs(),
    ],
};
