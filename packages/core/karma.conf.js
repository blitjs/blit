const watch = process.env.TEST_MODE === "watch";
module.exports = function(config) {
  config.set(
    Object.assign(require("./../../shared/karma.common")(config, watch), {
      karmaTypescriptConfig: {
        bundlerOptions: {
          transforms: [require("karma-typescript-es6-transform")()]
        },
        reports: {
          html: {
            directory: "coverage",
            subdirectory: "generated"
          },
          "text-summary": ""
        },
        compilerOptions: Object.assign(
          require("./../../tsconfig.common.json").compilerOptions,
          require("./tsconfig.json").compilerOptions
        ),
        include: ["./src", "./test", "../../shared"],
        coverageOptions: {
          exclude: [/\.(d|spec|test|)\.ts$/i, /\/shared\/.*.ts/i]
        }
      }
    })
  );
};
