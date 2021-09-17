"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTypes = createTypes;

var _defineProperty2 = require("../util/defineProperty");

var _asserts = require("./asserts");

var _type = require("./type");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createTypes() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$asserts = options.asserts,
      asserts = _options$asserts === void 0 ? _asserts.Asserts : _options$asserts,
      _options$exitArrayLoo = options.exitArrayLoop,
      exitArrayLoop = _options$exitArrayLoo === void 0 ? false : _options$exitArrayLoo,
      _options$arrayOfType = options.arrayOfType,
      arrayOfType = _options$arrayOfType === void 0 ? null : _options$arrayOfType;
  var types = {};
  Object.keys(asserts).forEach(function (assertName) {
    var assertProps = asserts[assertName];

    if (arrayOfType && assertProps.isArrayable === false) {
      return;
    }

    var type = new _type.Type(assertName, _objectSpread(_objectSpread({}, assertProps), {}, {
      arrayOfType: arrayOfType
    }));
    (0, _defineProperty2.defineProperty)(types, assertName, type.createValidator());

    if (assertName === 'array') {
      if (exitArrayLoop) {
        return;
      }

      (0, _defineProperty2.defineProperty)(types.array, 'of', createTypes({
        exitArrayLoop: true,
        arrayOfType: assertName
      }));
    } else if (assertName === 'nonEmptyArray') {
      if (exitArrayLoop) {
        return;
      }

      (0, _defineProperty2.defineProperty)(types.nonEmptyArray, 'of', createTypes({
        exitArrayLoop: true,
        arrayOfType: assertName
      }));
    }
  });
  return types;
}