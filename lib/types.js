"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTypes = createTypes;
exports.Types = void 0;

var _type = require("./type");

var _methods = require("./methods");

var _util = require("./util");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * @param {Object} [options]
 * @param {TypeChecking.Methods} [options.methods=Methods] Methods object.
 * @param {Boolean} [options.isArrayOf=false] whether part of "array.of" or not.
 * @param {Boolean} [options.isNullable=false] whether is nullable.
 * @desc Create Types object.
 * @returns {Object} Types object.
 *
 */
function createTypes() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$methods = options.methods,
      methods = _options$methods === void 0 ? _methods.Methods : _options$methods,
      _options$isArrayOf = options.isArrayOf,
      isArrayOf = _options$isArrayOf === void 0 ? false : _options$isArrayOf,
      _options$isNullable = options.isNullable,
      isNullable = _options$isNullable === void 0 ? false : _options$isNullable;
  var types = {};
  Object.keys(methods).forEach(function (assertFunc) {
    var method = methods[assertFunc];

    try {
      var type = new _type.Type(_objectSpread({
        assertFunc: assertFunc,
        isNullable: isNullable,
        isArrayOf: isArrayOf
      }, method));
      Object.defineProperty(types, assertFunc, {
        value: (0, _util.typeCreator)(type)
      });
    } catch (ex) {}

    if (assertFunc === 'array') {
      if (isArrayOf) {
        return; // exit recursion, array.of.array.of.array is not supported
      }

      Object.defineProperty(types.array, 'of', {
        value: createTypes({
          isArrayOf: true,
          isNullable: isNullable
        })
      });
    }
  });

  if (isNullable === false) {
    Object.defineProperty(types, 'nullable', {
      value: createTypes({
        isNullable: true
      })
    });
  }

  return types;
}
/**
 *
 * @typedef {Object<TypeChecking.Type>} TypeChecking.Types
 * @desc Contains all types used to setup the params object used by typecheck.
 *
 */


var Types = createTypes();
exports.Types = Types;