/* craco.config.js */
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');
module.exports = {
    webpack: {
        plugins: [new BundleAnalyzerPlugin()],
        configure: (webpackConfig, { env: webpackEnv, paths }) => {
            webpackConfig.optimization.splitChunks = {
                ...webpackConfig.optimization.splitChunks,
                cacheGroups: {
                    base: {
                        // 基本框架
                        chunks: 'all',
                        test: /(react|react-dom|react-dom-router)/,
                        name: 'base',
                        priority: 100,
                    },
                    jsoneditor: {
                        test: /react-lottie/,
                        name: 'react-lottie',
                        priority: 100,
                    },
                    commons: {
                        chunks: 'all',
                        // 将两个以上的chunk所共享的模块打包至commons组。
                        minChunks: 2,
                        name: 'commons',
                        priority: 80,
                    },
                },
            };
            return webpackConfig;
        },
    },
};
