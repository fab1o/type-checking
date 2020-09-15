/* eslint-disable no-use-before-define */
import { Config } from '../config';
import { getValueName } from '../util';

import { Params } from './params';

/**
 * @desc Error message builder.
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
     * @param {String} name Param name.
     * @param {TypeChecking.MessageBuilder.Param} [parent] - The parent param.
     * @desc Sets the current param based on a given param name.
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

        return this.param;
    }

    /**
     * @param {*} value - Value to stringify.
     * @returns {String} The "but received..." part of the error message.
     */
    static buildReceivedMessage(value) {
        const valueName = getValueName(value, {
            includeTypeName: true
        });

        return `${Config.receivedMessage} ${valueName}`;
    }

    /**
     * @param {String} customMessage - Custom error message.
     * @desc Creates a custom error message.
     * @returns {String} Error message: "Object.method() custom error message."
     */
    buildCustomMessage(customMessage) {
        return `${this.methodSignature} ${customMessage}.`.trim();
    }

    /**
     * @param {Object} options
     * @param {*} options.value - The user data.
     * @param {TypeChecking.Type} options.type - Type of validator.
     * @param {Array<*>} [options.expectedArgs=[]] - Expected arguments, must set to null when an empty string could be valid.
     * @param {String} [options.message] - Custom error message.
     * @param {Boolean} [options.isNested=false] - Whether it is expected nested object.
     * @desc Generates the error message.
     * @returns {String} Error message: "Object.method(param, param2, ...) param expected a type but received input."
     */
    buildMessage(options) {
        const { value, type, expectedArgs = [], message, isNested = false } = options;

        const typeDescription = type.toString(message, ...expectedArgs);

        const expected = `${Config.expectedMessage} ${typeDescription}`;

        const butReceived = MessageBuilder.buildReceivedMessage(value);

        const withProperties = isNested ? ` ${Config.withPropsMessage}` : '';

        return `${this.methodSignature} ${this.param} ${expected}${withProperties}${this.param.extension} ${butReceived}.`;
    }
}
