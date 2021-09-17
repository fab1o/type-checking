/**
 * @desc TypeChecking.Type - used to validate params.
 */
export class Type {
    /**
     * @param {String} name - Name could be the assert name in the check-types library.
     * @param {Object} [options={}]
     * @param {String} [options.assert=name] - The assert in check-types to use.
     * @param {String} [options.singular=name] - Name in singular.
     * @param {String} [options.plural=name+'s'] - Name in plural.
     * @param {Boolean} [options.isArray] Type is array.
    //  * @param {'array'|'nonEmptyArray'} [options.arrayOfType] "array" or "nonEmptyArray" or null.
     * @param {Boolean} [options.expectArgs=false] - Whether type expects an argument or not.
     * @param {Boolean} [options.isExtensible=true] - Whether or not it has extensions.
     * @param {Boolean} [options.isArrayable=true] - Whether or not it has array.of equivalent.
     * @param {Boolean} [options.autoDisplayArgs=true] - Whether or not automatically display arguments.
     * @param {TypeChecking.Type} [options.firstType] - The first type from combinatory types.
     * @param {Function} [options.validator] - The validator function used to validate the user input.
    //  * @param {Object} [options.orAsserts] - Asserts for type.or combination.
    //  * @param {Object} [options.andAsserts] - Asserts for type.and combination.
     * @param {'or'|'and'} [options.operator] - Operator for a combinatory type.
     * @param {Function} [options.validateCreator=()=>false] - A validate creator function.
     * @param {Function} [options.stringify=(x)=>String(x)] - A stringify function for the expected arguments.
     */
    constructor(name, options = {}) {
        const {
            assert = name,
            singular = name,
            plural = `${name}s`,
            isArray = false,
            // arrayOfType, ***
            expectArgs = false,
            isExtensible = true,
            isArrayable = true,
            autoDisplayArgs = true,
            firstType,
            validator,
            // orAsserts, ***
            // andAsserts, ***
            operator,
            validateCreator = () => false,
            stringify = (x) => String(x)
        } = options ?? {};

        this.name = name;
        this.assert = assert;
        this.plural = plural;
        this.isArray = isArray;
        if (isArray) {
            this.singular = `an Array of ${this.plural}`;
        } else {
            this.singular = singular;
        }
        // this.arrayOfType = arrayOfType; ***

        // switch (arrayOfType) { ***
        //     case 'array':
        //         this.singular = `an Array of ${this.plural}`;
        //         break;
        //     case 'nonEmptyArray':
        //         this.singular = `a non-empty Array of ${this.plural}`;
        //         break;
        //     default:
        //         this.singular = singular;
        //         break;
        // }

        this.firstType = firstType;
        this.validator = validator;
        this.expectArgs = !!expectArgs;
        this.isExtensible = !!isExtensible;
        this.isArrayable = !!isArrayable;
        this.autoDisplayArgs = !!autoDisplayArgs;
        this.operator = operator;
        this.validateCreator = validateCreator;
        this.stringify = stringify;

        // this.or = { ***
        //     asserts: orAsserts
        // };
        // this.and = {
        //     asserts: andAsserts
        // };
    }

    // /**
    //  * @desc Whether this type is an array.of or nonEmptyArray.of type.
    //  * @returns {Boolean}
    //  */
    // get isArray() { ***
    //     return !!this.arrayOfType;
    // }

    /**
     * @desc Creates a type validator.
    //  * @param {Array<*>} [expectedArgs] - expectedArgs for combinatory types.
     * @returns {Function} - Validator function.
     */
    // createValidator(expectedArgs) { ***
    createValidator() {
        if (this.expectArgs) {
            const validateWithArguments = function (...args) {
                // return this.validateCreator(this, expectedArgs, ...args);
                return this.validateCreator(this, ...args);
            };

            return validateWithArguments.bind(this);
        }

        // return this.validateCreator(this, expectedArgs);

        return this.validateCreator(this);
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

        let typeName = this.singular;

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
