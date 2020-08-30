process.env.LOG_LEVEL = process.env.LOG_LEVEL || "info";

module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/*.(test|spec).ts"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!scripts/**/*.ts",
    "!src/types/*.ts",
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testPathIgnorePatterns: ["node_modules"],
  verbose: true,
  silent: false,
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  setupFilesAfterEnv: ["jest-expect-message"],
  testEnvironment: "node",
};
