import { Config } from '../config';
// import { getValue, verifyValidateFunction } from '../util'; ***
import { getValue } from '../util';

/**
 * @desc TypeChecking.TypeChecker - The brain for the typecheck function.
 */
export class TypeChecker {
    /**
     * @param {Object} options
     * @param {TypeChecking.MessageBuilder.MessageBuilder} options.messageBuilder - MessageBuilder object.
     * @param {Array|Object} options.input - The user input.
     * @param {Object<TypeChecking.Type>} options.objParams - Params object built with Types.
     * @param {Error} [options.ErrorType=Config.ErrorType] - The Error type to throw.
     * @param {String} [options.signature] - Typecheker's function signature.
     * @param {String} [options.loggingFunc] - The function name for the logging: log, warn, info, error.
     */
    constructor(options) {
        const {
            messageBuilder,
            input,
            objParams,
            ErrorType = Config.ErrorType,
            signature,
            loggingFunc
        } = options;

        this.messageBuilder = messageBuilder;
        this.input = input;
        this.objParams = objParams;
        this.ErrorType = ErrorType;
        this.signature = signature;
        this.loggingFunc = loggingFunc;
    }

    /**
     * @param {Object} [options]
     * @param {Array|Object} [options.input=this.input] - The whole user input of all params.
     * @param {Object<TypeChecking.Type>} [options.objParams=this.objParams] - Params object built with Types.
     * @param {TypeChecking.MessageBuilder.Param} [options.parent] - The parent param.
     * @desc Validates object built with Types against user data.
     */
    execute(options = {}) {
        const { input = this.input, objParams = this.objParams, parent } = options;

        Object.keys(objParams).forEach((name, paramIndex) => {
            // step 1: get the validator function
            const paramValidate = objParams[name];

            // step 2: set the curent param so its name can be in the error message and used on object nesting
            this.messageBuilder.setCurrentParam(name, parent);

            // step 3: verify if dev setup params correctly
            // verifyValidateFunction(paramValidate, { ***
            //     param: this.messageBuilder.param,
            //     signature: this.signature
            // });

            // step 4: get the value - [ array, of, arguments ] versus { object: of: arguments }
            const value = getValue(input, paramIndex, name);

            // step 5: invoke type's validate function
            paramValidate(value, this);
        });
    }
}
