import Check from '@fab1o/check-types';

import { getValue } from '../util';

import { TypeChecker } from './typeChecker';

/**
 * @desc The brain for the typecheck.atLeastOne function.
 */
export class TypeCheckerAtLeastOne extends TypeChecker {
    constructor(options) {
        super(options);

        this.messageBuilder.methodSignature.params.atLeastOne = true;
    }

    execute(options) {
        super.execute(options);

        const { input = this.input, objParams = this.objParams } = options || {};

        let isProvided = false;

        Object.keys(objParams).forEach((name, paramIndex) => {
            // step 1: get the value
            const value = getValue(input, paramIndex, name);

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
