"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendValidateCreator = extendValidateCreator;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @typedef {Object} Options
 * @property {*} value User input value for the parameter in question.
 * @property {TypeChecking.MessageBuilder.MessageBuilder} messageBuilder MessageBuilder object.
 * @property {Array|Object} input All user input.
 * @property {Error} ErrorType The Error type to throw.
 *
 * @param {Function} validate Validate function to invoke.
 * @param {TypeChecking.Type} typeName Type to create optional validator.
 * @desc Creates a validator that skips type-checking if value is not assigned.
 * @throws {Error} When type checking fails.
 * @returns {Function} Validator function for types optional.
 * @note Type can be either nullable or optionable, cannot be both.
 */
function extendValidateCreator(validate, typeName) {
  /**
   * @param {Boolean} isOptional
   * @param {Options} options
   * @desc Skips validation if value is null or undefined.
   */
  function optionalValidate(isOptional, options) {
    var value = options.value;

    if (isOptional === false || _checkTypes["default"].assigned(value)) {
      validate(options);
    }
  }
  /**
   * @param {Boolean} isNullable
   * @param {Options} options
   * @desc Skips validation if value is null.
   */


  function nullableValidate(isNullable, options) {
    var value = options.value;

    if (isNullable && _checkTypes["default"]["null"](value)) {
      return;
    }

    validate(options);
  }
  /**
   * @param {Boolean} isUndefinable
   * @param {Options} options
   * @desc Skips validation if value is undefined.
   */


  function undefinableValidate(isUndefinable, options) {
    var value = options.value;

    if (isUndefinable && _checkTypes["default"].undefined(value)) {
      return;
    }

    validate(options);
  }

  var boundValidate = validate.bind(null);
  boundValidate.typeName = typeName;
  boundValidate.optional = optionalValidate.bind(null, true);
  boundValidate.optional.typeName = typeName;
  boundValidate.optional.isOptional = true;
  boundValidate.nullable = nullableValidate.bind(null, true);
  boundValidate.nullable.typeName = typeName;
  boundValidate.nullable.isNullable = true;
  boundValidate.undefinable = undefinableValidate.bind(null, true);
  boundValidate.undefinable.typeName = typeName;
  boundValidate.undefinable.isUndefinable = true;
  return boundValidate;
}