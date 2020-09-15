"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectValidateCreator = objectValidateCreator;

var _checkTypes = _interopRequireDefault(require("@fab1o/check-types"));

var _extendValidateCreator = require("./extendValidateCreator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @typedef {Object} Options
 * @property {*} value - User input value for the parameter in question.
 * @property {TypeChecking.MessageBuilder.MessageBuilder} messageBuilder - MessageBuilder object.
 * @property {Array|Object} input - All user input.
 * @property {Error} ErrorType - The Error type to throw.
 *
 * @param {TypeChecking.Type} type - The object type.
 * @param {Object<TypeChecking.Type>} [objParams=null] - Params object built with Types.
 * @desc Creates a checker for Types.object type.
 * @throws {Error} When type checking fails.
 * @returns {Function} Validator function for {@link Types.object}.
 */
function objectValidateCreator(type) {
  var objParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var isArray = type.isArray;

  var isNested = _checkTypes["default"].nonEmptyObject(objParams);
  /**
   * @param {Options} options
   */


  function validate(options) {
    var value = options.value,
        typeChecker = options.typeChecker;
    var messageBuilder = typeChecker.messageBuilder,
        ErrorType = typeChecker.ErrorType;
    var isOk = false;

    if (isArray) {
      isOk = _checkTypes["default"].array.of.object(value);
    } else {
      isOk = _checkTypes["default"].object(value);
    }

    if (isOk === false) {
      var errorMessage = messageBuilder.buildMessage({
        value: value,
        type: type,
        isNested: isNested
      });
      throw new ErrorType(errorMessage);
    }

    if (isNested) {
      var parent = messageBuilder.setParentParams(objParams, isArray);

      if (isArray) {
        value.forEach(function (val) {
          return typeChecker.execute({
            objParams: objParams,
            parent: parent,
            input: val
          });
        });
      }

      typeChecker.execute({
        objParams: objParams,
        parent: parent,
        input: value
      });
    }
  }

  return (0, _extendValidateCreator.extendValidateCreator)(validate, 'object');
}