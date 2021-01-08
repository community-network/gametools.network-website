/*
 * 
 * Webpack configuration
 * 
 */


const path = require('path');


module.exports = function (env, argv) {
    const base = {
        entry: './src/server/index.tsx',
        output: {
            filename: 'js/server.js', // Place it somewhere else on publish
            path: path.resolve(process.cwd(), 'dist'),
            publicPath: '/',
        },
        // Enable sourcemaps for debugging webpack's output.
        devtool: 'cheap-module-source-map',
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
        },
        module: {
            rules: [
                // Typescript loader
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'ts-loader',
                        }
                    ]
                },
                // Style loader
                {
                    test: /\.css$/,
                    include: path.resolve(process.cwd(), 'src'),
                    // We will collect css modules and extract them into single file
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                // bundle output
                                outputPath: 'css',
                                name: 'main.css',
                            },
                        },
                        "extract-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                modules: {
                                    // Different class names for different modes
                                    localIdentName: (env.mode === "production") ? "[hash:base64:5]--[local]" : "[path][name]__[local]--[hash:base64:5]",
                                }
                            }
                        },
                    ],
                },
            ]
        },
    }

    // server-specific configuration
    if (env.platform === 'server') {
        base.target = 'node';
    }

    // client-specific configurations
    if (env.platform === 'web') {
        base.entry = './src/client.tsx';
        base.output.filename = 'js/bundle.js';
    }

    return base;
}