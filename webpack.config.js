module.exports = {
    entry: {
        core: './src/core.js',
        hud: './src/hud.js'
    },
    output: {
        filename: '[name].js'
    },
    mode: 'development',
    // target: 'node',
    externals: {
        child_process: 'child_process'
    }
};
