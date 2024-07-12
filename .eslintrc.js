/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ['apps/**', 'packages/**'],
  extends: [require.resolve('@3rapp/code/eslint/lib')],
  parserOptions: {
    project: true,
  },
}
