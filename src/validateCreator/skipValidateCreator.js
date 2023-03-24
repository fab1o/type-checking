import { Check } from '@fab1o/check-types';

import { Config } from '../config';

import { logValidateCreator } from './logValidateCreator';

/**
 * @param {TypeChecking.Type} type - The skip type.
 * @desc Creates a validator function that does nothing.
 * @returns {Function} Validator function for {@link Types.skip}.
 */
export function skipValidateCreator(type) {
    const { name: typeName } = type;

    /**
     * @param {*} value - User input value for the param in question.
     * @param {TypeChecking.TypeChecker} typeChecker - TypeChecker object.
     * @param {String} [loggingFunc] - The function name for the logging: log, warn, info, error.
     */
    function validate(value, typeChecker, loggingFunc) {
        // typeChecker may not always be assigned here if dev messed up
        if (Check.not.assigned(typeChecker)) {
            throw TypeError('typecheck(...) params expected Types.skip not Types.skip()');
        }

        const { messageBuilder } = typeChecker;

        if (loggingFunc) {
            const errorMessage = messageBuilder.buildMessage({
                value,
                type
            });

            Config.logger[loggingFunc](errorMessage);
        }
    }

    return logValidateCreator(validate, { typeName });
}
