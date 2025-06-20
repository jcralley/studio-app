const webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    basePath: '',

    frameworks: ['qunit'],

    files: [
      'test/**/*.test.ts'
    ],

    preprocessors: {
      'test/**/*.test.ts': ['webpack']
    },

    webpack: {
      ...webpackConfig({ mode: 'development' }, { mode: 'development' }),
      devtool: 'inline-source-map',
      entry: undefined, // Remove entry for tests
      output: undefined, // Remove output for tests
      plugins: [], // Remove HtmlWebpackPlugin for tests
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--headless'
        ]
      },
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless'],
      },
    },

    singleRun: false,

    concurrency: Infinity,

    // QUnit configuration
    client: {
      qunit: {
        showUI: true,
        testTimeout: 50000
      }
    }
  });
};
