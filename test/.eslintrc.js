module.exports = {
    rules: {
        // in tests, classes are instantiated without a variable.
        'no-new': 'off',

        // allow examples without having to use 'this'
        'class-methods-use-this': 'off',

        // allow use new Boolean, new Number, etc...
        'no-new-wrappers': 'off',

        // allow use new Object
        'no-new-object': 'off',

        // allow use new Array
        'no-array-constructor': 'off',

        // allow multiple classes in one file
        'max-classes-per-file': 'off',

        // allow sparse arrays
        'no-sparse-arrays': 'off',

        // allow unused vars so examples in tests are more clear
        'no-unused-vars': 'off',

        // skip tests that use types that do not exist
        'jest/no-disabled-tests': 'off',
        'jest/no-commented-out-tests': 'off'
    },
    settings: {
        'disable/plugins': ['jsdoc', 'require-jsdoc-except']
    }
};
