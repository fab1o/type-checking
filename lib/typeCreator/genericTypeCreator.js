"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genericTypeCreator = genericTypeCreator;

var _checkTypes = _interopRequireDefault(require("check-types"));

var _optionableTypeCreator = require("./optionableTypeCreator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *
 * @param {TypeChecking.Type} type Type to create checker.
 * @param {Array<*>} expectedArgs What values are expected for this type.
 * @desc Creates a checker for any type.
 * @throws {Error} When typechecking fails.
 * @returns {Function} Validator function for any type.
 *
 */
function genericTypeCreator(type) {
  for (var _len = arguments.length, expectedArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    expectedArgs[_key - 1] = arguments[_key];
  }

  var assertFunc = type.assertFunc,
      isArrayOf = type.isArrayOf,
      isNullable = type.isNullable;

  function validate(options) {
    var value = options.value,
        messageBuilder = options.messageBuilder,
        ErrorType = options.ErrorType;

    if (isNullable && _checkTypes["default"]["null"](value)) {
      return;
    }

    var isOk = false;

    if (isArrayOf) {
      var _Check$array$of;

      isOk = (_Check$array$of = _checkTypes["default"].array.of)[assertFunc].apply(_Check$array$of, [value].concat(expectedArgs));
    } else {
      isOk = _checkTypes["default"][assertFunc].apply(_checkTypes["default"], [value].concat(expectedArgs));
    }

    if (isOk === false) {
      var errorMessage = messageBuilder.buildMessage({
        value: value,
        expectedArgs: expectedArgs,
        type: type
      });
      throw new ErrorType(errorMessage);
    }
  }

  return (0, _optionableTypeCreator.optionableTypeCreator)(validate, assertFunc);
}