const baseRules = require('@fab1o/eslint-config-base/addon/prettier/.prettierrc');
const newRules = {
    printWidth: 100
};

module.exports = Object.assign(baseRules, newRules);
