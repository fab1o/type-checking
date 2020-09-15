import Check from '@fab1o/check-types';

import { Type } from './types/type';
import { Types } from './types/types';

/**
 * @param {String} name Type name.
 * @param {Function} validator Custom function that validates input, must return boolean.
 * @param {Object} [options]
 * @param {String} [options.singular] Name in singular.
 * @param {String} [options.plural] Name in plural.
 * @param {Boolean} [options.expectArgs=false] Whether type expects an argument or not.
 * @param {Boolean} [options.autoDisplayArgs=true] Whether or not automatically display arguments.
 * @param {Function} [options.stringify=getArgumentValueName] A function to replace the default getArgumentValueName function for the arguments of this type.
 * @desc Creates a user defined type and adds it to Types object. A shortened syntax for Types.custom.
 * @example
 * const isBlueberry = (a) => String(a) === 'blueberry';
 *
 * addType('blueberry', isBlueberry, {
 *   singular: 'a Blueberry',
 *   plural: 'blueberries'
 * });
 * const params = {
 *    blueberry: Types.blueberry,
 *    maybeBlueberry: Types.blueberry.optional
 * };
 */
export function addType(name, validator, options = {}) {
    const signature = 'addType(name, validator, options)';

    if (Check.assigned(Types[name])) {
        throw SyntaxError(
            `${signature} name expected a Type name that does not already exist in Types.`
        );
    }

    if (Check.not.function(validator)) {
        throw SyntaxError(
            `${signature} validator expected a Function that returns boolean.`
        );
    }

    if (Check.not.object(options)) {
        throw SyntaxError(`${signature} [options] expected an Object.`);
    }

    const type = new Type(name, options);

    Object.defineProperty(Types, name, {
        value: type.createCustomValidator(validator, options.singular),
        writable: false,
        configurable: false
    });

    const arrayOfType = new Type(name, {
        ...options,
        isArray: true
    });

    Object.defineProperty(Types.array.of, name, {
        value: arrayOfType.createCustomValidator(validator, options.plural),
        writable: false,
        configurable: false
    });
}
