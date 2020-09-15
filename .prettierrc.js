const baseRules = require('@fab1o/eslint-config-base/addon/prettier/config');

const newRules = {
    printWidth: 92
};

module.exports = Object.assign(baseRules, newRules);
