import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { swc } from '@rollup/plugin-swc';

export default {
  input: 'index.jsx',
  output: {
    dir: 'dist',
    format: 'es',
    chunkFileNames: '[name].js',
  },
  preserveEntrySignatures: 'allow-extension',
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify('development'),
      }
    }),
    nodeResolve({
      extensions: ['.js', '.jsx'],
      exportConditions: ['workerd'],
    }),
    commonjs(),
    swc({
      swc: {
        jsc: {
          parser: {
            syntax: 'ecmascript',
            jsx: true,
            dynamicImport: true,
          },
          transform: {
            react: {
              development: false,
              runtime: 'automatic',
              useBuiltins: true,
            },
          }
        }
      }
    }),
  ],
};