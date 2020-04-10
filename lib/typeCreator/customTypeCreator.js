"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customTypeCreator = customTypeCreator;

var _checkTypes = _interopRequireDefault(require("check-types"));

var _optionableTypeCreator = require("./optionableTypeCreator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *
 * @param {TypeChecking.Type} typeCustom The custom type.
 * @param {Function} [customValidator=() => false] Custom function that returns falsy/truthy.
 * @param {String} [customMessage=''] Error message that describes what is expected.
 * @desc Creates a checker for Types.custom type.
 * @throws {Error} When typechecking fails.
 * @returns {Function} Validator function for `Types.custom`.
 *
 */
function customTypeCreator(typeCustom) {
  var customValidator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return false;
  };
  var customMessage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var isArrayOf = typeCustom.isArrayOf,
      isNullable = typeCustom.isNullable;

  function validate(options) {
    var value = options.value,
        messageBuilder = options.messageBuilder,
        input = options.input,
        ErrorType = options.ErrorType;

    if (isNullable && _checkTypes["default"]["null"](value)) {
      return;
    }

    var errorMessage = messageBuilder.buildMessage({
      value: value,
      customMessage: customMessage,
      type: typeCustom
    });

    function assertValue(val) {
      var isOk = false;

      try {
        isOk = customValidator(val, input);
      } catch (ex) {
        throw new ErrorType("".concat(messageBuilder.methodSignature, " Your custom validator function threw an error: ").concat(ex.message));
      }

      _checkTypes["default"].assert(isOk, errorMessage, ErrorType);
    }

    if (isArrayOf) {
      _checkTypes["default"].assert.array(value, errorMessage, ErrorType);

      value.map(function (v) {
        return assertValue(v);
      });
    }

    assertValue(value);
  }

  return (0, _optionableTypeCreator.optionableTypeCreator)(validate, 'custom');
}