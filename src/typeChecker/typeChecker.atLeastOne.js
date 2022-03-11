import Check from '@fab1o/check-types';

import { getValue } from '../util';

import { TypeChecker } from './typeChecker';

/**
 * @desc The brain for the typecheck.atLeastOne function.
 */
export class TypeCheckerAtLeastOne extends TypeChecker {
    /**
     * @param {Object} options
     * @param {TypeChecking.MessageBuilder.MessageBuilder} options.messageBuilder - MessageBuilder object.
     * @param {Array|Object} options.userArguments - The user userArguments.
     * @param {Object<TypeChecking.Type>} options.objParams - Params object built with Types.
     * @param {Error} [options.ErrorType=Config.ErrorType] - The Error type to throw.
     * @param {String} [options.signature] - Typecheker's function signature.
     * @param {String} [options.loggingFunc] - The function name for the logging: log, warn, info, error.
     */
    constructor(options) {
        super(options);

        this.messageBuilder.methodSignature.params.atLeastOne = true;
    }

    /**
     * @param {Object} [options]
     * @param {Array|Object} [options.userData=this.userArguments] - The data to be validated.
     * @param {Object<TypeChecking.Type>} [options.objParams=this.objParams] - Params object built with Types.
     * @param {TypeChecking.MessageBuilder.Param} [options.parent] - The parent param.
     * @desc Validates object built with Types against user data.
     */
    execute(options = {}) {
        super.execute(options);

        const { userData = this.userArguments, objParams = this.objParams } = options;

        let isProvided = false;

        Object.keys(objParams).forEach((name, paramIndex) => {
            // step 1: get the value
            const value = getValue(userData, paramIndex, name);

            // step 2: if value is provided, set flag
            if (Check.assigned(value)) {
                isProvided = true;
            }
        });

        // step 3: throw Error if no argument is provided
        if (isProvided === false) {
            const errorMessage = this.messageBuilder.buildCustomMessage(
                'at least one parameter must be provided'
            );

            throw new this.ErrorType(errorMessage);
        }
    }
}
