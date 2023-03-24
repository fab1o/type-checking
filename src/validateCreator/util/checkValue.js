import { Config } from '../../config';
import { isValueOk } from './isValueOk';

/**
 *
 * @param {*} value - User input value.
 * @param {TypeChecking.Type} type - Type.
 * @param {TypeChecking.TypeChecker} typeChecker - TypeChecker object.
 * @param {String} [loggingFunc] - The function name for the logging: log, warn, info, error.
//  * @param {Array<*>} [firstTypeExpectedArgs] - What values are expected for this type.or.type.
 * @param {Array<*>} [expectedArgs] - What values are expected for this type.
 * @throws {Error} When type checking fails.
 * @returns {Boolean}
 */
export function checkValue(
    value,
    type,
    typeChecker,
    loggingFunc,
    // firstTypeExpectedArgs, ***
    ...expectedArgs
) {
    // const { firstType, operator } = type; ***
    const { messageBuilder, ErrorType } = typeChecker;

    // set the priority for the logging to be: Type first, then TypeChecker.
    const funcToLog = loggingFunc || typeChecker.loggingFunc;

    const isOk = isValueOk(value, type, ...expectedArgs);

    // const isOk2 = isValueOk(value, type, ...expectedArgs); ***

    // let isOk = isOk2; ***

    // if (firstType) { ***
    //     // operator equals "or" or equals "and"
    //     const isOk1 = isValueOk(value, firstType, ...firstTypeExpectedArgs);

    //     if (isOk1 === false) {
    //         if (operator === 'and') {
    //             const errorMessage = messageBuilder.buildMessage({
    //                 value,
    //                 type,
    //                 firstType,
    //                 expectedArgs,
    //                 operator,
    //                 firstTypeExpectedArgs
    //             });

    //             throw new ErrorType(errorMessage);
    //         }

    //         if (Config.loggerMethodForOrType) {
    //             const errorMessage = messageBuilder.buildMessage({
    //                 value,
    //                 expectedArgs: firstTypeExpectedArgs,
    //                 type: firstType
    //             });

    //             Config.logger[Config.loggerMethodForOrType](errorMessage);
    //         }
    //     }

    //     isOk = operator === 'or' ? isOk1 || isOk2 : isOk1 && isOk2;
    // }

    if (isOk === false) {
        const errorMessage = messageBuilder.buildMessage({
            value,
            type,
            // firstType, ***
            expectedArgs
            // , operator ***
            // , firstTypeExpectedArgs ***
        });

        if (funcToLog) {
            Config.logger[funcToLog](errorMessage);
        } else {
            throw new ErrorType(errorMessage);
        }
    }

    return isOk;
}
