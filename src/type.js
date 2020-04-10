import { Config } from './config';
import { genericTypeCreator } from './typeCreator';

/**
 *
 * @class TypeChecking.Type
 *
 */
export class Type {
    /**
     *
     * @param {Object} options
     * @param {String} options.assertFunc Assert function in the check-types library.
     * @param {String} [options.singular=''] Message in singular.
     * @param {String} [options.plural=''] Message in plural.
     * @param {Boolean} [options.isArrayOf=false] Whether type is part of "array.of" or not.
     * @param {Boolean} [options.isNullable=false] Whether type is nullable.
     * @param {Boolean} [options.isExpectedArgs=false] If type receives any argument i.e. Types.instanceStrict
     * receives an argument, Types.custom receives two arguments.
     * @param {Function} [options.typeCreator=genericTypeCreator] Function to create type.
     * @param {Function} [options.stringify=(x) => x] Function that stringifies what is expected.
     */
    constructor(options) {
        const {
            assertFunc,
            singular = '',
            plural = '',
            isArrayOf = false,
            isNullable = false,
            isExpectedArgs = false,
            typeCreator = genericTypeCreator,
            stringify = (x) => x
        } = options;

        const isXExpected = singular.includes('{x}');
        const isYExpected = singular.includes('{y}');

        this.assertFunc = assertFunc;
        this.isArrayOf = isArrayOf;
        this.isNullable = isNullable;

        // if a type doesn't have a plural property, then do not create an array.of type
        if (isArrayOf && !!plural === false) {
            throw new SyntaxError(
                `Types.array.of.${assertFunc} - plural expected a non-empty String but received ${plural}`
            );
        }

        this.isExpectedArgs = isExpectedArgs || isXExpected || isYExpected;

        this.typeCreator = typeCreator;
        this.stringify = stringify;

        if (isArrayOf) {
            this.baseName = Config.arrayOfMessage;
            this.baseName += plural;
        } else if (singular) {
            this.baseName = singular;
        } else {
            this.baseName = '';
        }
    }

    replaceX(str, x) {
        return str.replace(/{x}/, this.stringify(x));
    }

    replaceY(str, y) {
        return str.replace(/{y}/, this.stringify(y));
    }

    /**
     *
     * @param {Boolean} [isNested=false] Whether Types.object has nested types.
     * @param {String} [customMessage=null] Custom error message for Types.custom only.
     * @param {*} [x=null] Expected argument for the x slot.
     * @param {*} [y=null] Expected argument for the y slot.
     * @desc Gets the type name as a String, ie: string, array, function, object or class instance.
     * @returns {String}
     *
     */
    toString(isNested = false, customMessage = null, x = null, y = null) {
        if (customMessage != null) {
            if (this.isArrayOf) {
                return `${Config.expectedMessage} ${Config.arrayOfMessage}${customMessage}`;
            }

            return `${Config.expectedMessage} ${customMessage}`;
        }

        let typeName = '';

        if (x != null && y != null) {
            typeName = this.replaceX(this.baseName, x);
            typeName = this.replaceY(typeName, y);
        } else if (x != null) {
            typeName = this.replaceX(this.baseName, x);
        } else if (y != null) {
            typeName = this.replaceY(this.baseName, y);
        } else {
            typeName = this.replaceX(this.baseName, '');
            typeName = this.replaceY(typeName, '');
        }

        if (isNested) {
            typeName += ` ${Config.withPropsMessage}`;
        }

        return `${Config.expectedMessage} ${typeName.trim()}`;
    }
}
