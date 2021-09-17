/**
 * @param {*} value - User input.
 * @desc Validator for Types.arrayBufferView.
 * @returns {Boolean}
 */
export function arrayBufferViewValidator(value) {
    return ArrayBuffer.isView(value);
}
