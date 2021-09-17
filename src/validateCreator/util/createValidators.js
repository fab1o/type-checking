import { Type } from '../../types/type';

/**
 * @param {TypeChecking.Type} type - Type to extend a validator for.
 * @param {'or'|'and'} operator - Operator for a combinatory type.
 * @param {Array<*>} expectedArgs - Expected values for this type.
 * @desc Creates validators for a combinatory type.
 * @returns {Object}
 */
export function createValidators(type, operator, expectedArgs) {
    const validators = {};

    const { asserts } = type[operator];

    Object.keys(asserts).forEach((name) => {
        const secondType = new Type(name, {
            firstType: type,
            operator,
            ...asserts[name]
        });

        validators[name] = secondType.createValidator(expectedArgs);
    });

    return validators;
}
