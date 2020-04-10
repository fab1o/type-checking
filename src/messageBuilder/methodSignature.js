import Check from 'check-types';

import { Config } from '../config';
import { getTypeName } from '../util';

import { hasSuperclass } from './util';
import { Param } from './param';

/**
 *
 * @class TypeChecking.MessageBuilder.MethodSignature
 * @desc Builds a method or function signature part of the error message:
 * "method(arg1, arg2, arg3)...", or "method({arg1, arg2, arg3})...", or etc...
 *
 */
export class MethodSignature {
    /**
     *
     * @param {Object} options
     * @param {Object|String} [options.object=null] Class instance or object.
     * @param {Function|String} [options.method=null] Method of the class or a function.
     * @param {Object<TypeChecking.Type>} [options.params=null] Params built with Types.
     * @param {Boolean} [options.isBracketsForced=false] Whether or not to add brackets to params list.
     *
     */
    constructor(options) {
        const { object = null, method = null, params = null, isBracketsForced = false } = options;

        if (Check.string(this.object)) {
            this.objectName = this.object;
        } else {
            this.object = object;
        }
        if (Check.string(this.method)) {
            this.methodName = this.method;
        } else {
            this.method = method;
        }

        // whether or not it should add three dots to the list of param names to represent that it inherits more params
        this.hasSuperclass = hasSuperclass(object);

        this.params = Param.parse(params);
        this.params.toString = this.getArrayParamNames.bind(this);

        this.isBracketsForced = isBracketsForced;
    }

    /**
     *
     * @desc Gets an Object's method or function name.
     * @returns {String} The "Object.method..." part of the message.
     *
     */
    get name() {
        if (Check.not.assigned(this.objectName)) {
            this.objectName = this.object != null ? `${getTypeName(this.object)}` : '';
        }

        if (Check.not.assigned(this.methodName)) {
            this.methodName = this.method != null ? `${getTypeName(this.method)}` : '';
        }

        const dot =
            Check.nonEmptyString(this.objectName) && Check.nonEmptyString(this.methodName)
                ? '.'
                : '';

        return `${this.objectName}${dot}${this.methodName}`;
    }

    /**
     *
     * @desc Gets a full list of parameters between brackets.
     * @returns {String} The "(param1, param2, ...)" part of the message.
     *
     */
    get parameters() {
        const hasMethod = this.name.length > 0;

        const openBracket = hasMethod ? '(' : this.params.length > 0 ? '{' : '';
        const closBracket = hasMethod ? ')' : this.params.length > 0 ? '}' : '';

        return `${openBracket}${this.params}${closBracket}`;
    }

    /**
     *
     * @param {Number} i Position in the list of params, must be a positive number.
     * @param {Object<TypeChecking.Type>} [params={}] List of params.
     * @param {Boolean} [isArrayOf=false] Helps identify that an object is enclosed by an array.
     * @desc Replaces a param from this.params with a new given list of params.
     * @returns {TypeChecking.MessageBuilder.Param} The param that was replaced.
     *
     */
    replaceObjectParams(i, params = {}, isArrayOf = false) {
        if (i >= 0) {
            const parent = this.params[i];

            this.params.splice(i, 1, Param.parse(params, parent));
            this.params[i].isArrayOf = isArrayOf;

            return parent;
        }

        return null;
    }

    /**
     *
     * @param {String} name Name of param.
     * @param {Array<TypeChecking.MessageBuilder.Param>} [params=this.params] List of params.
     * @desc Gets the parent of a param from a list of parameters.
     * @returns {TypeChecking.MessageBuilder.Param|null} The param found in the given list.
     *
     */
    getParamParent(...args) {
        return this.getParam(args)?.parent;
    }

    /**
     *
     * @param {String} name Name of param.
     * @param {TypeChecking.MessageBuilder.Param} [parent=null] The parent param.
     * @param {Array<TypeChecking.MessageBuilder.Param>} [params=this.params] List of params.
     * @desc Gets a param from a list of parameters.
     * @returns {TypeChecking.MessageBuilder.Param|null} The param found in the given list.
     *
     */
    getParam(name, parent = null, params = this.params) {
        let param = null;

        for (let i = 0; i < params.length; i++) {
            param = params[i];

            if (Check.array(param)) {
                param = this.getParam(name, parent, param);
            }

            if (param != null && param.name === name && param.parent === parent) {
                break;
            }
        }

        return param;
    }

    /**
     *
     * @param {Array<TypeChecking.MessageBuilder.Param>} [params=this.params] List of params.
     * @desc Gets a string with a list of parameter names.
     * @returns {Array<String>} A string that represents the full list of param names.
     *
     */
    getArrayParamNames(params = this.params) {
        const paramsList = params.map((param) => this.getParamNames(param));

        const openBracket = this.isBracketsForced ? '{ ' : '';
        const closBracket = this.isBracketsForced ? ' }' : '';

        return `${openBracket}${paramsList.join(', ')}${closBracket}`;
    }

    /**
     *
     * @param {Array<TypeChecking.MessageBuilder.Param>} params List of params.
     * @desc Gets a string with a list of parameter names.
     * @returns {String} A string that represents a sub-set list of param names.
     *
     */
    getParamNames(params) {
        if (Check.not.array(params)) {
            // params could also not be an array and just be 1 param
            return `${params.name}`;
        }

        // params is an "options" object
        const parentParams = Config.etceteraOn && this.hasSuperclass ? ', ...' : '';

        // helps identify that an object is enclosed by an array
        const openBracket = params.isArrayOf ? '[' : '';
        const closBracket = params.isArrayOf ? ']' : '';

        return `${openBracket}{ ${this.getArrayParamNames(params)}${parentParams} }${closBracket}`;
    }

    toString() {
        return `${this.name}${this.parameters}`;
    }
}
