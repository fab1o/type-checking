"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customValidateCreator = customValidateCreator;

var _checkTypes = require("@fab1o/check-types");

var _extendValidateCreator = require("./extendValidateCreator");

/**
 * @typedef {Object} Options
 * @property {*} value User input value for the parameter in question.
 * @property {TypeChecking.MessageBuilder.MessageBuilder} messageBuilder MessageBuilder object.
 * @property {Array|Object} input All user input.
 * @property {Error} ErrorType The Error type to throw.
 *
 * @param {TypeChecking.Type} type The custom type.
 * @param {Function} [validator=() => false] Custom function that validates input, must return boolean.
 * @param {String} [message] Error message that describes what is expected.
 * @param {Array<*>} expectedArgs What values are expected for this type.
 * @desc Creates a validator for Types.custom type.
 * @throws {Error} When type checking fails.
 * @returns {Function} Validator function for {@link Types.custom}.
 */
function customValidateCreator(type) {
  var validator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
    return false;
  };
  var message = arguments.length > 2 ? arguments[2] : undefined;

  for (var _len = arguments.length, expectedArgs = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    expectedArgs[_key - 3] = arguments[_key];
  }

  var isArray = type.isArray;
  /**
   * @param {Options} options
   */

  function validate(options) {
    var value = options.value,
        typeChecker = options.typeChecker,
        input = options.input; // typeChecker will always be assigned here

    var messageBuilder = typeChecker.messageBuilder,
        ErrorType = typeChecker.ErrorType;
    var errorMessage = messageBuilder.buildMessage({
      value: value,
      type: type,
      message: message,
      expectedArgs: expectedArgs
    });

    function assertValue(val) {
      var isOk = false;

      try {
        // pass in the the whole user 'input' to dev - could be useful.
        isOk = validator.apply(void 0, [val, input].concat(expectedArgs));
      } catch (ex) {
        throw new ErrorType("".concat(messageBuilder.methodSignature, " ").concat(type.name, " validator function threw an error: ").concat(ex.message));
      }

      (0, _checkTypes.assert)(isOk, errorMessage, ErrorType);
    }

    if (isArray) {
      // do not fail if array is empty
      _checkTypes.assert.array(value, errorMessage, ErrorType);

      value.forEach(function (val) {
        return assertValue(val);
      });
    } else {
      assertValue(value);
    }
  }

  return (0, _extendValidateCreator.extendValidateCreator)(validate, type.name);
}