/**
 * @desc Creates a validator function that does nothing.
 * @returns {Function} Validator function for {@link Types.skip}.
 */
export function skipValidateCreator() {
    function validate() {}

    validate.typeName = 'skip';

    return validate;
}
