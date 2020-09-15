import Check from '@fab1o/check-types';

import { Config } from '../config';
import { MessageBuilder, MethodSignature } from '../messageBuilder';

import { typecheck } from './typecheck';
import { composeOverloading } from './util';

/**
 * @access public
 * @typedef {Object} Args
 * @property {Function|Object|String} [object] - Class, instance or object name.
 * @property {Function|String} [method] - Function or method name.
 * @property {Function} validator - Custom function that returns falsy/truthy.
 * @property {String} message - Error message that describes what is expected.
 * @property {Error} [ErrorType=Config.ErrorType] - The Error type to throw.
 *
 * @param {...Args} args
 * @desc Calls a given validator function and throws an Error if it returns falsy.
 * @throws {Error} When given validator function returns falsy.
 * @example
 * typecheck.if(this, this.method, validator, message, Error);
 * typecheck.if(this, this.method, validator, message);
 * typecheck.if(this, validator, message);
 * typecheck.if(func, validator, message);
 * typecheck.if(validator, message);
 */
typecheck.if = (...args) => {
    const {
        signature,
        object,
        method,
        c: validator,
        d: message,
        ErrorType = Config.ErrorType
    } = composeOverloading(args, 'typecheck.if');

    if (Check.not.function(validator)) {
        throw SyntaxError(
            `${signature} validator expected a Function that returns boolean.`
        );
    }

    if (Check.not.string(message)) {
        throw SyntaxError(`${signature} message expected a String.`);
    }

    let isOk = false;

    try {
        isOk = validator();
    } catch (ex) {
        throw SyntaxError(`${signature} validator function threw an error: ${ex.message}`);
    }

    if (isOk === false) {
        const methodSignature = new MethodSignature({
            object,
            method
        });

        const messageBuilder = new MessageBuilder(methodSignature);
        const errorMessage = messageBuilder.buildCustomMessage(message);

        throw new ErrorType(errorMessage);
    }
};
