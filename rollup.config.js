import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

export default [
    {
        input: './src/core.js',
        output: { file: 'index.js', format: 'module' },
        plugins: [resolve()],
        external: ['lit-html', 'hybrids'],
    },
    {
        input: './src/ue-elems.js',
        output: {
            file: 'ue-elems.js',
            format: 'iife',
            name: 'UE_ELEMS',
        },
        plugins: [resolve(), terser()],
    },
    {
        input: './src/core.d.ts',
        output: [{ file: 'index.d.ts', format: 'module' }],
        plugins: [dts()],
        external: ['lit-html', 'hybrids'],
    },
];
