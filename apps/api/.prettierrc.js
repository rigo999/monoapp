// apps/api/.eslintrc.js
/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    parserOptions: {
        project: true,
    },
    extends: [require.resolve('@3rapp/code/eslint/node')],
};
