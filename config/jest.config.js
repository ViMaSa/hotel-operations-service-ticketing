const path = require("path");

module.exports = {
  roots: [path.join(__dirname, "../tests")],
  testEnvironment: "node",
  testMatch: [path.join(__dirname, "../tests/**/*.test.js")],
  globalSetup: path.join(__dirname, "setup.js"),
  globalTeardown: path.join(__dirname, "teardown.js")
};
