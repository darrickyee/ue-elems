import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';

export default [
    {
        input: './src/core.js',
        output: { file: 'index.js', format: 'module' },
        plugins: [resolve()]
    },
    {
        input: './src/core.js',
        output: { file: 'demo.js', format: 'iife', name: 'UE_ELEMS' },
        plugins: [resolve()]
    },
    {
        input: './src/core.d.ts',
        output: { file: 'index.d.ts', format: 'module' },
        plugins: [dts()]
    }
];
