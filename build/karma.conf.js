const alias = require('./alias');

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
    webpack: {
      resolve: { alias },
      devtool: 'inline-source-map',
    },
    webpackMiddleware: {
      noInfo: true,
    },
  });
};
