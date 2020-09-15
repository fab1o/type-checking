"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateStringValidateCreator = dateStringValidateCreator;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

var _extendValidateCreator = require("./extendValidateCreator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Regex pattern for matching ISO datetimes.
var ISO_REG_EX = /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?(Z|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
/**
 *
 * @typedef {Object} Options
 * @property {*} value User input value for the parameter in question.
 * @property {TypeChecking.MessageBuilder.MessageBuilder} messageBuilder MessageBuilder object.
 * @property {Array|Object} input All user input.
 * @property {Error} ErrorType The Error type to throw.
 *
 * @param {TypeChecking.Type} type The dateString type.
 * @desc Creates a validator for Types.dateString type that checks for an ISO date format String.
 * @throws {Error} When type checking fails.
 * @returns {Function} Validator function for {@link Types.dateString}.
 * @note Parsing date strings with the Date constructor or Date.parse is discouraged.
 *
 */

function dateStringValidateCreator(type) {
  var isArray = type.isArray;
  /**
   * @param {Options} options
   */

  function validate(options) {
    var _ref = options || {},
        value = _ref.value,
        typeChecker = _ref.typeChecker; // typeChecker may not always be assigned here if dev messed up


    if (_checkTypes["default"].not.assigned(typeChecker)) {
      throw SyntaxError("Types: expected Types.dateString not Types.dateString()");
    }

    var messageBuilder = typeChecker.messageBuilder,
        ErrorType = typeChecker.ErrorType;
    var errorMessage = messageBuilder.buildMessage({
      value: value,
      type: type
    });

    function assertValue(val) {
      _checkTypes["default"].assert(ISO_REG_EX.test(val), errorMessage, ErrorType);
    }

    if (isArray) {
      // do not fail if array is empty
      _checkTypes["default"].assert.array(value, errorMessage, ErrorType);

      value.forEach(function (val) {
        return assertValue(val);
      });
    } else {
      assertValue(value);
    }
  }

  return (0, _extendValidateCreator.extendValidateCreator)(validate, 'dateString');
}