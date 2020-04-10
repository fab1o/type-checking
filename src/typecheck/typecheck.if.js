import { assert } from 'check-types';

import { Config } from '../config';
import { MethodSignature, MessageBuilder } from '../messageBuilder';

import { composeOverloading } from './util';
import { typecheck } from './typecheck';

/**
 *
 * @param {Object} [object] Class instance or object.
 * @param {Function} [method] Function or method.
 * @param {Function} [customValidator=() => false] Custom function that returns falsy/truthy.
 * @param {String} [customMessage=''] Error message that describes what is expected.
 * @param {Error} [ErrorType=Config.Error] The Error type to throw.
 * @desc Calls a custom validator function and throws an Error if it returns falsy. This is the
 * equilavent of Check.assert but for functions.
 * @throws {Error} When typechecking fails.
 * @example
 * typecheck.if(this, this.method, customValidator, customMessage, Error);
 *
 * typecheck.if(this, this.method, customValidator, customMessage);
 *
 * typecheck.if(this, customValidator, customMessage);
 *
 * typecheck.if(func, customValidator, customMessage);
 *
 * typecheck.if(customValidator, customMessage);
 *
 */
typecheck.if = (...args) => {
    const {
        signature,
        a: object,
        b: method,
        c: customValidator,
        d: customMessage,
        e: ErrorType = Config.Error
    } = composeOverloading(args);

    assert.function(
        customValidator,
        `${signature} customValidator ${Config.expectedMessage} a Function.`,
        Config.DefaultError
    );

    assert.string(
        customMessage,
        `${signature} customMessage ${Config.expectedMessage} a String.`,
        Config.DefaultError
    );

    const methodSignature = new MethodSignature({
        object,
        method
    });

    const messageBuilder = new MessageBuilder(methodSignature);

    const errorMessage = messageBuilder.buildCustomMessage(customMessage);

    let isOk = false;

    try {
        isOk = customValidator();
    } catch (ex) {
        throw new Config.DefaultError(
            `${signature} Your custom validator function threw an error: ${ex.message}`
        );
    }

    assert(isOk, errorMessage, ErrorType);
};
