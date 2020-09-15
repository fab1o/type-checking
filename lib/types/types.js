"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Types = void 0;

var _asserts = require("./asserts");

var _type = require("./type");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @param {Object} [options]
 * @param {Object} [options.asserts=Asserts] Asserts object.
 * @param {Boolean} [options.isArray=false] Whether type is part of "array.of" or not.
 * @desc Creates Types object.
 * @returns {Object} Types object.
 */
function createTypes() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$asserts = options.asserts,
      asserts = _options$asserts === void 0 ? _asserts.Asserts : _options$asserts,
      _options$isArray = options.isArray,
      isArray = _options$isArray === void 0 ? false : _options$isArray;
  var types = {};
  Object.keys(asserts).forEach(function (assertName) {
    var assertProps = asserts[assertName];
    var type = new _type.Type(assertName, _objectSpread({
      isArray: isArray
    }, assertProps));
    Object.defineProperty(types, assertName, {
      value: type.createValidator(),
      writable: false,
      configurable: false
    });

    if (assertName === 'array') {
      if (isArray) {
        return; // exit recursion, array.of.array.of.array is not supported
      }

      Object.defineProperty(types.array, 'of', {
        value: createTypes({
          isArray: true
        }),
        writable: false,
        configurable: false
      });
    }
  });
  return types;
}
/**
 * @access public
 * @typedef {Object<TypeChecking.Type>} TypeChecking.Types
 * @desc Contains all types used to setup the params object used by typecheck.
 *
 */


var Types = createTypes();
exports.Types = Types;