import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

export default [
    {
        input: './src/core.js',
        output: { file: 'index.js', format: 'module' },
        plugins: [resolve(), terser()],
        external: ['lit-html', 'hybrids', 'tippy.js'],
    },
    {
        input: './src/core.js',
        output: {
            file: 'demo.js',
            format: 'iife',
            name: 'UE_ELEMS',
            globals: {
                'tippy.js': 'tippy',
            },
        },
        plugins: [resolve()],
        external: ['tippy.js'],
    },
    {
        input: './src/core.d.ts',
        output: { file: 'index.d.ts', format: 'module' },
        plugins: [dts()],
        external: ['lit-html', 'hybrids'],
    },
];
