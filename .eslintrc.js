module.exports = {
    env: {
        node: true
    },
    extends: [
        '@fab1o/eslint-config-babel',

        '@fab1o/eslint-config-base/addon/jest',
        '@fab1o/eslint-config-base/addon/jsdoc',
        '@fab1o/eslint-config-base/addon/disable',

        '@fab1o/eslint-config-babel/addon/prettier'
    ]
};
