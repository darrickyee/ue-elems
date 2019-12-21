// Req global typescript module (npm install -g typescript; npm link typescript)
const path = require('path');
const DtsBundleWebpack = require('dts-bundle-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './ts/core.ts',
    module: {
        rules: [{ use: 'ts-loader', exclude: /node_modules/ }]
    },
    resolve: {
        extensions: ['.ts']
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname),
        library: 'ue-elems',
        libraryTarget: 'umd'
    },
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new DtsBundleWebpack({
            name: 'ue-elems',
            main: 'src/core.d.ts',
            out: '../index.d.ts'
        })
    ],
    externals: [nodeExternals()]
};
