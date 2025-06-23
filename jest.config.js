module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs",
    //fix for the following error
    // https://stackoverflow.com/questions/73958968/cannot-use-import-statement-outside-a-module-with-axios

    "\\.(css|less|scss|sass)$": "<rootDir>/tests/quill.js"
    //above fix for Jest error for quill.core.css
    //https://stackoverflow.com/questions/46177148/how-to-exclude-css-module-files-from-jest-test-suites
  },
  collectCoverage: true,
  coverageReporters: ["text", "lcov"],
  coverageDirectory: "reports/coverage",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        suiteName: "jest tests"
      }
    ]
  ],
  transform: {
    "vee-validate/dist/rules": "babel-jest"
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@babel)",
    "<rootDir>/node_modules/(?!vee-validate/dist/rules)"
  ],
  watchPathIgnorePatterns: ["node_modules"],
  snapshotSerializers: ["jest-serializer-vue"]
};
