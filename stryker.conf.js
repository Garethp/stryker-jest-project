module.exports = function (config) {
  config.set({
    mutator: "typescript",
    packageManager: "yarn",
    reporters: ["html", "clear-text", "progress"],
    testRunner: "jest",
    transpilers: ["typescript"],
    coverageAnalysis: "off",
    tsconfigFile: "tsconfig.json",
    files: ["src/**/*", "jest.config.js"],
    jest: {
      config: {
        roots: ["<rootDir>/src"],
      },
    },
    plugins: ["@stryker-mutator/*"],
    mutate: [
      "src/**/*.ts",
      "!src/**/*@(.test|.spec|Spec).ts",
      "!src/types/*.ts",
    ],
  });
};
