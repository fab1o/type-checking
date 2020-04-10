"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectTypeCreator = objectTypeCreator;

var _checkTypes = _interopRequireDefault(require("check-types"));

var _util = require("../util");

var _optionableTypeCreator = require("./optionableTypeCreator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * @param {TypeChecking.Type} typeObject The object type.
 * @param {Object<TypeChecking.Type>} [params=null] Params object built with Types.
 * @desc Creates a checker for Types.object type.
 * @throws {Error} When typechecking fails.
 * @returns {Function} Validator function for `Types.object`.
 *
 */
function objectTypeCreator(typeObject) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var isArrayOf = typeObject.isArrayOf,
      isNullable = typeObject.isNullable;

  var isNested = _checkTypes["default"].nonEmptyObject(params);

  function validate(options) {
    var value = options.value,
        messageBuilder = options.messageBuilder,
        paramIndex = options.paramIndex,
        ErrorType = options.ErrorType;

    if (isNullable && _checkTypes["default"]["null"](value)) {
      return;
    }

    var isOk = false;

    if (isArrayOf && isNested) {
      isOk = _checkTypes["default"].array.of.nonEmptyObject(value);
    } else if (isArrayOf) {
      isOk = _checkTypes["default"].array.of.object(value);
    } else if (isNested) {
      isOk = _checkTypes["default"].nonEmptyObject(value);
    } else {
      isOk = _checkTypes["default"].object(value);
    }

    if (isOk === false) {
      var errorMessage = messageBuilder.buildMessage({
        value: value,
        isNested: isNested,
        type: typeObject
      });
      throw new ErrorType(errorMessage);
    }

    if (isNested) {
      var parent = messageBuilder.methodSignature.replaceObjectParams(paramIndex, params, isArrayOf);

      if (isArrayOf) {
        value.map(function (v) {
          return (0, _util.typecheckParams)(_objectSpread({}, options, {
            params: params,
            parent: parent,
            input: v
          }));
        });
      }

      (0, _util.typecheckParams)(_objectSpread({}, options, {
        params: params,
        parent: parent,
        input: value
      }));
    }
  }

  return (0, _optionableTypeCreator.optionableTypeCreator)(validate, 'object');
}