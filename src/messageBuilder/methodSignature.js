import { Check } from '@fab1o/check-types';

import { getTypeToString, hasSuperclass } from '../util';

import { Params } from './params';

/**
 * @desc Signature of a method or function or stand-alone object (initial part of the error message).
 */
export class MethodSignature {
    /**
     * @param {Object} options
     * @param {Object|String} [options.object=null] - Class instance or object (or name as String).
     * @param {Function|String} [options.method=null] - Method of a class or Class constructor or function (or name as String).
     * @param {Object<TypeChecking.Type>} [options.objParams=null] - Object built with Types.
     * @param {Boolean} [options.displayBrackets=false] - Whether or not to display brackets "{ }" for an object input.
     */
    constructor(options) {
        const {
            object = null,
            method = null,
            objParams = null,
            displayBrackets = false
        } = options;

        // Whether or not it should add three dots to the list of param names to represent that it inherits more params.
        const displayEtcetera = hasSuperclass(object) && method == null;

        this.object = object;
        this.method = method;

        this.params = new Params(objParams, {
            displayEtcetera,
            displayBrackets
        });
    }

    /**
     * @desc Gets the method signature name.
     * @returns {String} The "Object.method..." part of the message.
     */
    get name() {
        const objectName = getTypeToString(this.object, '');
        const methodName = getTypeToString(this.method, '');

        let dot;

        if (Check.nonEmptyString(objectName) && Check.nonEmptyString(methodName)) {
            dot = '.';
        } else {
            dot = '';
        }

        return `${objectName}${dot}${methodName}`;
    }

    /**
     * @desc Gets a full list of parameters between brackets.
     * @returns {String} The "(param1, param2, ...)" part of the message.
     */
    get parameters() {
        let openBracket = '';
        let closBracket = '';

        if (Check.nonEmptyString(this.name)) {
            // methodName(...)
            openBracket = '(';
            closBracket = ')';
        } else if (this.params.length > 0) {
            // {...}
            openBracket = '{';
            closBracket = '}';
        }

        return `${openBracket}${this.params}${closBracket}`;
    }

    /**
     * @param {String} name - Name of param.
     * @param {TypeChecking.MessageBuilder.Param} [parent=null] - The parent param.
     * @param {TypeChecking.MessageBuilder.Params} [params=parent?.params??this.params] - Collection of parameters.
     * @desc Gets a param from a list of parameters.
     * @throws {ReferenceError} Internal failure.
     * @returns {TypeChecking.MessageBuilder.Param} The param found in the given params list.
     */
    findParam(name, parent = null, params = parent?.params ?? this.params) {
        let param = null;

        for (let i = 0; i < params.length; i++) {
            param = params.get(i);

            if (Check.instanceStrict(param, Params)) {
                param = this.findParam(name, parent, param);
            }

            if (param != null && param.name === name && param.parent === parent) {
                break;
            }
        }

        if (param == null) {
            // should never have to throw this error
            throw ReferenceError(`findParam(...) not able to find param: ${name}.`);
        }

        return param;
    }

    toString() {
        return `${this.name}${this.parameters}`;
    }
}
