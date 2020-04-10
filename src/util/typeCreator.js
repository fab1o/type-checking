/**
 *
 * @param {TypeChecking.Type} type Type.
 * @desc Invokes the type creator function.
 * @returns {Function} Typechecker function.
 *
 */
export function typeCreator(type) {
    if (type.isExpectedArgs) {
        return function typeCreatorWithArguments(...args) {
            return type.typeCreator(type, ...args);
        };
    }

    return type.typeCreator(type);
}
