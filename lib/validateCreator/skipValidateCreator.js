"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skipValidateCreator = skipValidateCreator;

/**
 * @desc Creates a validator function that does nothing.
 * @returns {Function} Validator function for {@link Types.skip}.
 */
function skipValidateCreator() {
  function validate() {}

  validate.typeName = 'skip';
  return validate;
}