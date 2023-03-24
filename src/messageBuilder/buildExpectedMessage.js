// ***
// import { Config } from '../config';

/**
 * @param {Object} options
 * @param {TypeChecking.Type} options.type - Type.
//  * @param {TypeChecking.Type} [options.firstType=''] - The first type from combinatory types.
 * @param {Array<*>} [options.expectedArgs=[]] - Expected arguments, must set to null when an empty string could be valid.
//  * @param {Array<*>} [options.firstTypeExpectedArgs=[]] - What values are expected for this type.or.type.
//  * @param {'or'|'and'} [options.operator] - Operator for a combinatory type.
 * @param {String} [options.message] - Custom error message.
 * @returns {String} The "expected type..." part of the error message.
 */
export function buildExpectedMessage(options) {
    const {
        type,
        // firstType = '',
        expectedArgs = [],
        // firstTypeExpectedArgs = [],
        // operator,
        message
    } = options;

    const typeDesc = type.toString(message, ...expectedArgs);

    // ***
    // const firstTypeDesc = firstType.toString(message, ...firstTypeExpectedArgs);
    //
    // if (operator) { ***
    //     return `${Config.expectedMessage} ${firstTypeDesc} ${operator} ${typeDesc}`;
    // }
    //
    // return `${Config.expectedMessage} ${typeDesc}`;

    return `expected ${typeDesc}`;
}
