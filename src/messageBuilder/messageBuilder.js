/* eslint-disable no-use-before-define */
import { Config } from '../config';

import { getValueName } from './util';

/**
 *
 * @class TypeChecking.MessageBuilder.MessageBuilder
 * @desc Builds a complete error message: "Object.method(param, param2, ...) param expected a type but received input."
 *
 */
export class MessageBuilder {
    /**
     *
     * @param {TypeChecking.MessageBuilder.MethodSignature} methodSignature
     */
    constructor(methodSignature) {
        this.methodSignature = methodSignature;
        this.param = null;
        this.type = null;
        this.input = null;
    }

    /**
     *
     * @param {String} name Param name.
     * @param {TypeChecking.MessageBuilder.Param} [parent] The parent param.
     * @desc Sets the current param based on a given param name.
     *
     */
    setParam(name, parent) {
        this.param = this.methodSignature.getParam(name, parent);
    }

    /**
     *
     * @param {*} value Value to stringify.
     * @returns {String} The "but received..." part of the error message.
     *
     */
    static buildReceived(value) {
        const typeName = getValueName(value, true);

        return `${Config.receivedMessage} ${typeName}`;
    }

    /**
     *
     * @param {String} customMessage Custom error message.
     * @desc Creates a custom error message.
     * @returns {String} Error message: "Object.method() custom error message."
     *
     */
    buildCustomMessage(customMessage) {
        return `${this.methodSignature} ${customMessage}.`.trim();
    }

    /**
     *
     * @param {Object} options
     * @param {*} options.value The user input.
     * @param {TypeChecking.Type} options.type The type to check.
     * @param {Array<*>} [options.expectedArgs=[]] Expected arguments, must set to null when an empty string could be valid.
     * @param {Boolean} [options.isNested=false] Whether it is expected nested object.
     * @param {String} [options.customMessage=null] Custom error message.
     * @desc Creates the error message.
     * @returns {String} Error message: "Object.method(param, param2, ...) param expected a type but received input."
     *
     */
    buildMessage(options) {
        const { value, type, expectedArgs = [], isNested = false, customMessage = null } = options;

        const butReceived = MessageBuilder.buildReceived(value);
        const typeExpected = type.toString(isNested, customMessage, ...expectedArgs);

        return `${this.methodSignature} ${this.param} ${typeExpected} ${butReceived}.`;
    }
}
