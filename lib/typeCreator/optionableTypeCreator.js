"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optionableTypeCreator = optionableTypeCreator;

var _checkTypes = _interopRequireDefault(require("check-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *
 * @param {Function} validate Validate function to invoke.
 * @param {TypeChecking.Type} type Type to create optional checker.
 * @desc Creates an isOptional checker for any type, as an option to skip typechecking.
 * @throws {Error} When typechecking fails.
 * @returns {Function} Validator function for any type with `isOptional`.
 *
 */
function optionableTypeCreator(validate, type) {
  var isNullable = type.isNullable;

  function optionalValidate(isOptional, options) {
    var value = options.value; // messageBuilder is undefined when the param setup is wrong. Types.type() versus Types.type

    if (isNullable && _checkTypes["default"]["null"](value)) {
      return;
    }

    if (isOptional === false) {
      validate(options);
    }

    if (_checkTypes["default"].not.undefined(value)) {
      validate(options);
    }
  }

  var bindedValidate = optionalValidate.bind(null, false);
  bindedValidate.type = type;
  bindedValidate.optional = optionalValidate.bind(null, true);
  bindedValidate.optional.type = type;
  return bindedValidate;
}