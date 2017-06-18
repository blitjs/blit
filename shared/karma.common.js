module.exports = function buildConfiguration(config, watch) {
  return {
    logLevel: config.LOG_INFO,
    autoWatch: watch,
    singleRun: watch ? false : true,
    frameworks: ["jasmine", "karma-typescript"],
    files: [
      {
        pattern: "src/**/*.ts"
      },
      {
        pattern: "test/**/*.ts"
      },
      {
        pattern: "../../shared/**/*.ts"
      }
    ],
    preprocessors: {
      "src/**/*.ts": ["karma-typescript"],
      "test/**/*.ts": ["karma-typescript"],
      "../../shared/**/*.ts": ["karma-typescript"]
    },
    reporters: ["progress", "karma-typescript"],
    browsers: ["Chrome"],
    colors: true,
    port: 9876,
    client: {
      captureConsole: true
    }
  };
};
