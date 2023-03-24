module.exports = {
    rules: {
        // in tests, classes are instantiated without a variable.
        'no-new': 'off',

        // allow use new Boolean, new Number, etc...
        'no-new-wrappers': 'off',

        // allow use new Array
        'no-array-constructor': 'off',

        // allow multiple classes in one file
        'max-classes-per-file': 'off',

        // allow unused vars so examples in tests are more clear
        'no-unused-vars': 'off',

        // allow use skip
        'jest/no-disabled-tests': 'off',

        // allow commenting out tests
        'jest/no-commented-out-tests': 'off'
    },
    settings: {
        'disable/plugins': ['jsdoc', 'require-jsdoc-except']
    }
};
