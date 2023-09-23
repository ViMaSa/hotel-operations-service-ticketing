module.exports = {
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  testMatch: ["**/tests/**/*.test.js"],
};
