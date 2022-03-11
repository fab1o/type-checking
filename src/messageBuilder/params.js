import Check from '@fab1o/check-types';

// ***
// import { Config } from '../config';
// import { verifyValidateFunction } from '../util';

import { Param } from './param';

/**
 * @desc Collection of parameters
 */
export class Params {
    /**
     * @param {Object<TypeChecking.Type>} [objParams] - Object built with Types.
     * @param {Object} options
     * @param {TypeChecking.MessageBuilder.Param} [options.parent] - Parent of the collection of parameters.
     * @param {Boolean} [options.displayEtcetera=false] - Whether or not to display "...".
     * @param {Boolean} [options.displayBrackets=false] - Whether or not to display brackets "{ }".
     */
    constructor(objParams, options) {
        const { parent, displayEtcetera = false, displayBrackets = false } = options ?? {};

        if (Check.object(objParams)) {
            this.params = Params.toArray(objParams, parent);
        } else {
            this.params = [];
        }

        this.displayBrackets = displayBrackets;
        this.displayEtcetera = displayEtcetera;

        // this is being set on TypeCheckerAtLeastOne class to prevent displaying the brackets when it should not
        this.atLeastOne = false;
    }

    /**
     * @desc Length of the collection.
     * @returns {Number}
     */
    get length() {
        return this.params.length;
    }

    /**
     * @desc Whether at least one parameter is required in the collection.
     * @returns {Boolean}
     */
    get isSomeParamRequired() {
        return this.params.some((p) => p.isRequired);
    }

    /**
     * @desc Whether every parameter in the collection is non-required (either Optional or Undefinable).
     * @returns {Boolean}
     */
    get isEveryParamNonRequired() {
        return this.length > 0 && this.params.every((p) => p.isNonRequired);
    }

    /**
     * @param {Function} func
     * @desc Creates a new array populated with the results of calling a provided function on every param.
     * @returns {Array<TypeChecking.MessageBuilder.Param>}
     */
    map(func) {
        return this.params.map(func);
    }

    /**
     * @param {Number} index
     * @desc Gets an item of the collection.
     * @returns {TypeChecking.MessageBuilder.Param|undefined}
     */
    get(index) {
        return this.params[index];
    }

    /**
     * @param {Object<TypeChecking.Type>} [objParams] - Params built with Types.
     * @param {TypeChecking.MessageBuilder.Param} [parent=null] - Parent in case of Param of Param.
     * @desc Converts Params built with Types to an Array of Params.
     * @returns {Array<TypeChecking.MessageBuilder.Param>} Array of parameters.
     *
     */
    static toArray(objParams, parent = null) {
        if (objParams == null) {
            return [];
        }

        return Object.keys(objParams).map((name) => {
            const paramValidate = objParams[name];

            // ***
            // verifyValidateFunction(paramValidate, { parent, name });
            // const { isNullable, isOptional, isUndefinable } = paramValidate;

            const { isOptional } = paramValidate;

            return new Param({
                name,
                parent,
                // isNullable, ***
                isOptional
                // , isUndefinable ***
            });
        });
    }

    /**
     * @param {TypeChecking.MessageBuilder.Params} [params=this.params] - Collection of parameters.
     * @desc Gets a string with a list of parameter names.
     * @returns {String} A string that represents the full list of Param names by a given array of Params.
     */
    toString(params = this.params) {
        const paramsList = params.map((param) => this.stringify(param));

        // brackets for Types.object() param
        const openBracket = this.displayBrackets && this.atLeastOne ? '{' : '';
        const closBracket = this.displayBrackets && this.atLeastOne ? '}' : '';

        return `${openBracket}${paramsList.join(', ')}${closBracket}`;
    }

    /**
     * @param {TypeChecking.MessageBuilder.Param} param - A param.
     * @desc Gets a string with a list of parameter names.
     * @returns {String} A string that represents the Param name or a sub-set list of param names, children of a given Param.
     */
    stringify(param) {
        // params with no children
        if (Check.not.assigned(param.params)) {
            return `${param.name}`;
        }

        // params is an "options" object
        // ***
        // const parentParams = Config.etceteraOn && this.displayEtcetera ? ', ...' : '';
        const parentParams = this.displayEtcetera ? ', ...' : '';

        // helps identify that an object is enclosed by an array (defined in MessageBuilder)
        const openBracket = param.isArray ? '[' : '';
        const closBracket = param.isArray ? ']' : '';

        const arrayParamNames = this.toString(param.params);

        // brackets for Types.array.of.object() param
        return `${openBracket}{${arrayParamNames}${parentParams}}${closBracket}`;
    }
}
