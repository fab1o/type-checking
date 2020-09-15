"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.genericValidateCreator = genericValidateCreator;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

var _extendValidateCreator = require("./extendValidateCreator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @typedef {Object} Options
 * @property {*} value User input value for the parameter in question.
 * @property {TypeChecking.MessageBuilder.MessageBuilder} messageBuilder MessageBuilder object.
 * @property {Array|Object} input All user input.
 * @property {Error} ErrorType The Error type to throw.
 *
 * @param {TypeChecking.Type} type Type to create a validator for.
 * @param {Array<*>} expectedArgs What values are expected for this type.
 * @desc Creates a validator that does not skip type checking.
 * @throws {Error} When type checking fails.
 * @returns {Function} Validator function for any type.
 */
function genericValidateCreator(type) {
  for (var _len = arguments.length, expectedArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    expectedArgs[_key - 1] = arguments[_key];
  }

  var name = type.name,
      isArray = type.isArray;
  /**
   * @param {Options} options
   */

  function validate(options) {
    var _ref = options || {},
        value = _ref.value,
        typeChecker = _ref.typeChecker; // typeChecker may not always be assigned here if dev messed up


    if (_checkTypes["default"].not.assigned(typeChecker)) {
      throw SyntaxError("Types: expected Types.".concat(name, " not Types.").concat(name, "()"));
    }

    var messageBuilder = typeChecker.messageBuilder,
        ErrorType = typeChecker.ErrorType;
    var isOk = false;

    if (isArray) {
      var _Check$array$of;

      isOk = (_Check$array$of = _checkTypes["default"].array.of)[name].apply(_Check$array$of, [value].concat(expectedArgs));
    } else {
      isOk = _checkTypes["default"][name].apply(_checkTypes["default"], [value].concat(expectedArgs));
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

  return (0, _extendValidateCreator.extendValidateCreator)(validate, name);
}