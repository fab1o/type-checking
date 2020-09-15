import { Config } from '../config';

import { customValidateCreator, genericValidateCreator } from '../validateCreator';
import { getArgumentValueName } from '../util';

/**
 * @desc Type used to validate params.
 */
export class Type {
    /**
     * @param {String} name - Name could be the assert name in the check-types library.
     * @param {Object} [options={}]
     * @param {String} [options.singular] - Name in singular.
     * @param {String} [options.plural] - Name in plural.
     * @param {Boolean} [options.isArray=false] - Whether type is part of "array.of" or not.
     * @param {Boolean} [options.expectArgs=false] - Whether type expects an argument or not.
     * @param {Boolean} [options.autoDisplayArgs=true] - Whether or not automatically display arguments.
     * @param {Function} [options.stringify=getArgumentValueName] - A function to replace the default stringify function for the arguments: x and y.
     * @param {Function} [options.validateCreator=genericValidateCreator] - A function to replace the generic type creator function.
     */
    constructor(name, options = {}) {
        const {
            singular = name,
            plural = `${name}s`,
            isArray = false,
            expectArgs = false,
            autoDisplayArgs = true,
            stringify = getArgumentValueName,
            validateCreator = genericValidateCreator
        } = options;

        this.name = name;

        this.singular = singular || name;
        this.plural = plural || `${name}s`;
        this.isArray = !!isArray;
        this.expectArgs = !!expectArgs;
        this.autoDisplayArgs = !!autoDisplayArgs;
        this.stringify = stringify || getArgumentValueName;
        this.validateCreator = validateCreator || genericValidateCreator;
    }

    /**
     * @desc Creates a type validator.
     * @returns {Function} - Validator function.
     */
    createValidator() {
        if (this.expectArgs) {
            const validateWithArguments = function (...args) {
                return this.validateCreator(this, ...args);
            };

            return validateWithArguments.bind(this);
        }

        return this.validateCreator(this);
    }

    /**
     * @param {Function} [validator=() => false] - Custom function that validates input, must return boolean.
     * @param {String} [message] - Error message that describes what is expected.
     * @desc Creates a custom type validator.
     * @returns {Function} Validator function.
     */
    createCustomValidator(validator, message) {
        if (this.expectArgs) {
            const validateWithArguments = function (...args) {
                return customValidateCreator(this, validator, message, ...args);
            };

            return validateWithArguments.bind(this);
        }

        return customValidateCreator(this, validator, message);
    }

    /**
     * @param {String} [message=this.name] - Custom error message.
     * @param {*} [args] - Expected arguments.
     * @desc Gets the type name as a String, ie: string, array, function, object or class instance.
     * @returns {String}
     */
    toString(message = this.name, ...args) {
        if (this.name === 'custom') {
            return message;
        }

        let typeName;

        if (this.isArray && this.plural) {
            typeName = `${Config.arrayOfMessage} ${this.plural}`;
        } else if (this.singular) {
            typeName = this.singular;
        } else {
            typeName = '';
        }

        if (/{[a-k]}/.test(typeName)) {
            // a max of 6 arguments are supported for user defined template
            ['a', 'b', 'c', 'd', 'e', 'f'].forEach((letter, i) => {
                const arg = args[i];

                if (arg !== undefined) {
                    typeName = typeName
                        .replace(new RegExp(`{${letter}}`, 'i'), this.stringify(arg))
                        .trim();
                } else {
                    typeName = typeName.replace(new RegExp(`{${letter}}`, 'i'), '').trim();
                }
            });
        } else if (this.autoDisplayArgs && args.length > 0) {
            const argNames = args.map((arg) => `${this.stringify(arg)}`).join();

            typeName += `: ${argNames}`;
        }

        return typeName;
    }
}
