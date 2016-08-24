const webpack = require('./webpack.conf');

module.exports = config => {
  config.set({
    frameworks: ['jasmine'],
    files: [
      '../test/fixtures/*.html',
      '../test/index.js',
    ],
    preprocessors: {
      '../test/fixtures/*.html': ['html2js'],
      '../test/index.js': ['webpack', 'sourcemap'],
    },
    reporters: ['progress'],
    colors: true,
    browsers: ['Chrome', 'Firefox'],
    singleRun: true,
    concurrency: Infinity,
    webpack,
    webpackMiddleware: {
      noInfo: true,
    },
  });
};
