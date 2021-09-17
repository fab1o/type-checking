/* eslint-disable no-use-before-define */
import { Params } from './params';
import { buildExpectedMessage } from './buildExpectedMessage';
import { buildReceivedMessage } from './buildReceivedMessage';

/**
 * @desc TypeChecking.MessageBuilder - Error message builder.
 */
export class MessageBuilder {
    /**
     * @param {TypeChecking.MessageBuilder.MethodSignature} methodSignature
     */
    constructor(methodSignature) {
        this.methodSignature = methodSignature;

        this.param = null;
    }

    /**
     * @param {String} name - Name of param.
     * @param {TypeChecking.MessageBuilder.Param} [parent] - A parent param.
     * @desc Sets the current param based on a given param name and parent.
     */
    setCurrentParam(name, parent) {
        this.param = this.methodSignature.findParam(name, parent);
    }

    /**
     * @param {Object<TypeChecking.Type>} objParams - Params built with Types.
     * @param {Boolean} [isArray=false] - Helps identify that an object is enclosed by an array.
     * @desc Sets the inner params of the current param.
     * @throws {ReferenceError} Internal failure.
     * @returns {TypeChecking.MessageBuilder.Param} The current param.
     */
    setParentParams(objParams, isArray = false) {
        // setCurrentParam() must be called before setParentParams(), this.param should never be null here
        if (this.param == null) {
            throw ReferenceError(
                'setParentParams(...) this.param is null. Call setCurrentParam() before.'
            );
        }

        this.param.params = new Params(objParams, {
            parent: this.param
        });

        this.param.isArray = isArray;

        // return current param for convenience
        return this.param;
    }

    /**
     * @param {String} customMessage - Custom error message.
     * @desc Generates a custom error message.
     * @returns {String} Error message: "Object.method() custom error message."
     */
    buildCustomMessage(customMessage) {
        return `${this.methodSignature} ${customMessage}.`;
    }

    /**
     * @param {Object} options
     * @param {*} options.value - The user data.
     * @param {TypeChecking.Type} options.type - Type.
    //  * @param {TypeChecking.Type} [options.firstType=null] - The first type from combinatory types.
     * @param {Array<*>} [options.expectedArgs] - Expected arguments, must set to null when an empty string could be valid.
    //  * @param {Array<*>} [options.firstTypeExpectedArgs] - What values are expected for this type.or.type.
     * @param {String} [options.message] - Custom error message.
    //  * @param {'or'|'and'} [options.operator] - Operator for a combinatory type.
     * @desc Generates the error message.
     * @returns {String} Error message: "Object.method(param, param2, ...) param expected a type but received input."
     */
    buildMessage(options) {
        const { value } = options;

        const expected = buildExpectedMessage(options);

        const butReceived = buildReceivedMessage(value);

        return `${this.methodSignature} ${this.param} ${expected}${this.param.extension} ${butReceived}.`;
    }
}
