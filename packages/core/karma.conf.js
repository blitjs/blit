const watch = process.env.TEST_MODE === 'watch';

console.log(require("./../../tsconfig.common.json"));
module.exports = function (config) {
    config.set({
        frameworks: [
            'jasmine',
            'karma-typescript'
        ],
        files: [
            { pattern: 'src/**/*.ts' },
            { pattern: 'test/**/*.ts' }
        ],
        preprocessors: {
            'src/**/*.ts': ['karma-typescript'],
            'test/**/*.ts': ['karma-typescript']
        },
        reporters: [
            'progress',
            'karma-typescript'
        ],
        browsers: ['Chrome'],
        karmaTypescriptConfig: {
            bundlerOptions: {
                transforms: [require('karma-typescript-es6-transform')()]
            },
            reports: {
                'html': {
                  'directory': 'coverage',
                  'subdirectory': 'generated'
                },
                'text-summary': ''
            },
            compilerOptions: Object.assign(
              require("./../../tsconfig.common.json").compilerOptions,
              require("./tsconfig.json").compilerOptions
            )
        },
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: watch,
        singleRun: watch ? false : true,
        port: 9876,
        client: {
            captureConsole: true
        }
    });
};
