/**
 * @param {Object<TypeChecking.Type>} [objParams] - Params built with Types.
 * @desc Whether every parameter is non-required (either Optional or Undefinable).
 * @returns {Boolean}
 *
 */
export function isEveryParamNonRequired(objParams) {
    if (objParams == null) {
        return false;
    }

    return Object.keys(objParams).every((name) => {
        const paramValidate = objParams[name];

        return paramValidate && (paramValidate.isOptional || paramValidate.isUndefinable);
    });
}
